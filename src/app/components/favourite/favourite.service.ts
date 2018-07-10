import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from 'rxjs/Rx'
import {GlobalService} from './../../core/services/global.service'
import { map } from 'rxjs/operators'
@Injectable()
export class FavouriteService {
  private url:string='https://www.omdbapi.com/?apikey=34286e10';
  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }

  getFavouriteMovies(pageNumber){
    let allFavouriteMoviesId=this.globalService.getFavouriteMoviesId();
    let from=(pageNumber-1)*10;
    let to;
    if(pageNumber*10>allFavouriteMoviesId.length){
      to=(pageNumber-1)*10+allFavouriteMoviesId.length%10;
    }else{
      to=pageNumber*10;
    }
    
    let favouriteMoviesId=allFavouriteMoviesId.slice(from, to);
    return Observable.from(favouriteMoviesId)
    .mergeMap(favouriteMovieId=>{
      return this.http.get<any>(this.url + '&i=' + favouriteMovieId)
    })
    .pipe(
      map(movie=>{
        return  this.transformToFavouriteMovie(movie);
      })
    )
  }

  private transformToFavouriteMovie(movieData){
    let movie={
      _id:movieData.imdbID,
      posterUrl:movieData.Poster,
      title: movieData.Title,
      type: movieData.Type,
      year: movieData.Year
    }
    return movie;
  }
}
