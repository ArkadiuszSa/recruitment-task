import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GlobalService {
  private _subject = new Subject<any>();
  private obs=new BehaviorSubject<any>(event);
  constructor() { }

  setLastSearchedPhrase(lastSearchedPhrase){
    localStorage.setItem('lastSearchedPhrase', JSON.stringify(lastSearchedPhrase))
  }

  getLastSearchedPhrase(){
    return JSON.parse(localStorage.getItem('lastSearchedPhrase'))
  }

  runSearch(event) {
    this._subject.next(event);
  }

  get searchEvents$ () {
    return this._subject.asObservable();
  }

  removeMovieFromFavourites(movieId){
    let favouriteMovies= this.getFavouriteMovies()
    let favouriteMoviesId= this.getFavouriteMoviesId();
    let index=favouriteMoviesId.indexOf(movieId);
    if (index > -1) {
      favouriteMovies.splice(index, 1);
      localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovies))
    }
  }

  getFavouriteMovies(){
    let favouriteMoviesJson=localStorage.getItem('favouriteMovies');
    if(favouriteMoviesJson===null){
      return [];
    }else{
      return JSON.parse(favouriteMoviesJson);
    }
  }

  getFavouriteMoviesId() {
    let favouriteMoviesJson=localStorage.getItem('favouriteMovies');
    let favouriteMovies= JSON.parse(favouriteMoviesJson)
    let favouriteMoviesId=[];
    if(!favouriteMovies){
      return [];
    }
    else{
      for( let favouriteMovie of favouriteMovies){
        favouriteMoviesId.push(favouriteMovie._id)
      }
      return favouriteMoviesId;
    }
  }
}
