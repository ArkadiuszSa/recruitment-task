import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from '../../../environments/environment';

import { GlobalService } from '../../shared/services/global.service';
import { Movie } from './movie.model'

interface MoviesData {
  Search:[{
    Poster: string,
    Title: string,
    imdbID: string
  }],
  totalResults: string;
  Response: string
}

interface MovieData {
  Poster: string,
  Title: string,
  imdbID: string
}
interface FavouriteMovieData {
  Poster: string,
  Title: string,
  Year: string,
  Type: string,
  imdbID: string
}

interface FavouriteMovie {
  _id: string,
  posterUrl: string,
  title: string,
  year: string,
  type: string
}

@Injectable()
export class HomeService {
  private url:string;
  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ){
    this.url=environment.apiUrl;
  }
 
  addMovieToFavourites(movieId:number) {
    return this.http.get<FavouriteMovieData>(this.url + '&i=' + movieId).pipe(
      map(movieData => {
        let favouriteMovie:FavouriteMovie = {
          _id: movieData.imdbID,
          posterUrl: movieData.Poster,
          title: movieData.Title,
          type: movieData.Type,
          year: movieData.Year
        }
        let favouriteMoviesJson=localStorage.getItem('favouriteMovies');
        let favouriteMovies:Array<FavouriteMovie>=JSON.parse(favouriteMoviesJson)
        if(!favouriteMovies){
          localStorage.setItem('favouriteMovies', JSON.stringify([favouriteMovie]))
        }else{
          if(favouriteMovies.indexOf(favouriteMovie)===-1){
            favouriteMovies.unshift(favouriteMovie)
            localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovies))
          }
        }
      })
    )
  }

  private transformToMovie(moviesData:Array<MovieData>): Array<Movie> {
    
    let movies:Array<Movie> = [];
    let favouriteMoviesId = this.globalService.getFavouriteMoviesId();
    for(let movieData of moviesData){
      let isFavourite:boolean = false;
      if(favouriteMoviesId !== null){
        var index:number = favouriteMoviesId.indexOf(movieData.imdbID);
        if(index !== -1){
          isFavourite=true;
        }
      }
      movies.push({
        _id: movieData.imdbID,
        title: movieData.Title,
        posterUrl: movieData.Poster,
        isFavourite: isFavourite
      })
    }
    return movies;
  }

  getMovies(searchedPhrase: string, pageNumber: number){
    let from:number = (pageNumber -1) *12;
    let apiPage2:number = Math.ceil(pageNumber*12/10);
    let apiPage1:number= apiPage2 -1;

    let firstPage$ = this.http.get<MoviesData>(this.url + '&s='+searchedPhrase+ '&page='+apiPage1).pipe((res) => {
      return res;
    })
    let secondPage$ = this.http.get<MoviesData>(this.url + '&s='+searchedPhrase+ '&page='+apiPage2).pipe((res) => {
      return res;
    })

    let result:Array<MovieData>;
    return Observable.forkJoin(firstPage$, secondPage$).pipe(
      map(res=>{
        if(res[0].Response === 'True' && res[1].Response === 'True') {
          let moviesFromFirstPage:Array<MovieData> = res[0].Search.slice(from%10, 10);
          let moviesFromSecondPage:Array<MovieData> = res[1].Search.slice(0, (from+12) %10 || 10);
          result = moviesFromFirstPage.concat(moviesFromSecondPage);  
        }else if(res[0].Response === 'True') {
          result = res[0].Search.slice(from%10, res[0].Search.length);
        }else{
          return 'error';
        }
        return {'movies':this.transformToMovie(result),'numberOfResults':Number(res[0].totalResults)}
      })
    )
  }
}
