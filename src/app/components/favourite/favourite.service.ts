import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import {GlobalService} from '../../shared/services/global.service'
import { map } from 'rxjs/operators'
import { FavouriteMovie } from './favourite-movie.model'

@Injectable()
export class FavouriteService {
  constructor(
    private globalService: GlobalService
  ) { }

  public getFavouriteMovies(pageNumber:number, searchedPhrase:string) {
    let allFavouriteMovies:Array<FavouriteMovie> = this.globalService.getFavouriteMovies();
    let favouriteMovies:Array<FavouriteMovie> = [];
    let numberOfMovies:number;

    if(searchedPhrase !== '') {
      searchedPhrase = searchedPhrase.toUpperCase();      
      allFavouriteMovies = allFavouriteMovies.filter((movie) => {
        let title:string = movie.title.toUpperCase();
        return title.includes(searchedPhrase)
      })
    }

    let from:number = (pageNumber -1) *10;
    let to:number;

    if(pageNumber * 10 > allFavouriteMovies.length){
      to = (pageNumber -1)*10 + allFavouriteMovies.length %10;
    }else{
      to = pageNumber *10;
    }
    
    numberOfMovies= allFavouriteMovies.length
    favouriteMovies= allFavouriteMovies.slice(from, to);
    return {'favouriteMovies' : favouriteMovies, 'numberOfMovies' : numberOfMovies};
  }

}
