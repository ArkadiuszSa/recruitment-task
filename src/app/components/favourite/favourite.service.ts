import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from 'rxjs'
import {GlobalService} from '../../core/services/global.service'
import { map } from 'rxjs/operators'
@Injectable()
export class FavouriteService {
  private url:string='https://www.omdbapi.com/?apikey=34286e10';
  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }

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

  getFavouriteMovies(pageNumber, searchedPhrase){
    let allFavouriteMovies=this.globalService.getFavouriteMovies();
    let favouriteMovies=[];
    let numberOfMovies;
    if(searchedPhrase!==''){
      searchedPhrase=searchedPhrase.toUpperCase();      
      allFavouriteMovies=allFavouriteMovies.filter((movie)=>{
        let title=movie.title.toUpperCase();
        return title.includes(searchedPhrase)
      })
    }

    let from=(pageNumber-1)*10;
    let to;
    if(pageNumber*10>allFavouriteMovies.length){
      to=(pageNumber-1)*10+allFavouriteMovies.length%10;
    }else{
      to=pageNumber*10;
    }
    numberOfMovies=allFavouriteMovies.length
    favouriteMovies=allFavouriteMovies.slice(from, to);
    return {'movies':favouriteMovies,'numberOfMovies':numberOfMovies};
  }


}
