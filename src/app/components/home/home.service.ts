import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from 'rxjs/Rx'
import { map } from 'rxjs/operators'
import { GlobalService } from '../../core/services/global.service';

interface IMovieData{
  Title:string,
  Poster:string
}

@Injectable()
export class HomeService {
  private url:string='https://www.omdbapi.com/?apikey=34286e10';
  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ){   
    
  }
 
   getMovies2(searchedPhrase, pageNumber){
     return this.http.get<any>(this.url + '&s='+searchedPhrase+ '&page='+pageNumber).pipe(
       map(movies=>{
        if(movies.Response==='True'){
          return {'movies':this.transformToMovie(movies.Search),'numberOfResults':movies.totalResults}
        }else{
          return 'error'
        }
       })
     )
  }

  addMovieToFavourites(movieId) {
    return this.http.get<any>(this.url + '&i=' + movieId).pipe(
      map(movieData=>{
        let favouriteMovie= {
          _id:movieData.imdbID,
          posterUrl:movieData.Poster,
          title: movieData.Title,
          type: movieData.Type,
          year: movieData.Year
        }
        this.globalService.addMovieToFavourites(favouriteMovie);
      })
    )
  }

  private transformToMovie(moviesData){
    let movies=[];
    let favouriteMoviesId=this.globalService.getFavouriteMoviesId2();
    for(let movieData of moviesData){
      let isFavourite=false;
      if(favouriteMoviesId!==null){
        var index = favouriteMoviesId.indexOf(movieData.imdbID);
        
        if(index !== -1){
          isFavourite=true;
        }
      }

      movies.push({
        _id:movieData.imdbID,
        title:movieData.Title,
        posterUrl:movieData.Poster,
        isFavourite:isFavourite
      })
    }
    return movies;
  }



  getMovies(searchedPhrase,pageNumber){
    let from=(pageNumber-1)*12;
    let apiPage1=from%10;
    let apiPage2=apiPage1+1;


    let firstPage$= this.http.get<any>(this.url + '&s='+searchedPhrase+ '&page='+pageNumber).pipe((res)=>{
      return res;
    })

    let secondPage$= this.http.get<any>(this.url + '&s='+searchedPhrase+ '&page='+(pageNumber+1)).pipe((res)=>{
      return res;
    })

    let result;
    return Observable.forkJoin(firstPage$,secondPage$).pipe(
      map(res=>{
        if(res[0].Response === 'True'&&res[1].Response === 'True'){
          let moviesFromFirstPage=res[0].Search.slice(from%10,10);
          let moviesFromSecondPage=res[1].Search.slice(0,(from+12)%10);
          result=moviesFromFirstPage.concat(moviesFromSecondPage);  
        }else if(res[0].Response === 'True'){
          let moviesFromFirstPage=res[0].Search.slice(from%10,res[0].Search.length);
        }else{
          return 'error';
        }
        console.log(res)
        console.log(result)
        return {'movies':this.transformToMovie(result),'numberOfResults':res[0].totalResults}
      })

    )

  }


}
