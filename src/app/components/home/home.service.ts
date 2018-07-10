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
  private url:string='http://www.omdbapi.com/?apikey=34286e10';
  constructor(
    private http: HttpClient,
    private globalServis: GlobalService
  ){   
    
  }
 
   getMovies(searchedPhrase, pageNumber){
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

  private transformToMovie(moviesData){
    let movies=[];
    let favouriteMoviesId=this.globalServis.getFavouriteMoviesId();
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

}
