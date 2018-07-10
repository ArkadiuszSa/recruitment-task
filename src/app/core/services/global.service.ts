import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GlobalService {
  private _subject = new Subject<any>();
  constructor() { }

  addMovieIdToFavourites(movieId){
    let favoriteMoviesIdJson=localStorage.getItem('favoriteMovies');
    let favoriteMoviesId=JSON.parse(favoriteMoviesIdJson)
    
    if(!favoriteMoviesId){
      localStorage.setItem('favoriteMovies', JSON.stringify([movieId]))
    }else{
      if(favoriteMoviesId.indexOf(movieId)===-1){
        favoriteMoviesId.push(movieId)
        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMoviesId))
      }
    }
  }

  removeMovieIdFromFavourites(movieId){
    let favoriteMoviesIdJson=localStorage.getItem('favoriteMovies');
    let favoriteMoviesId=JSON.parse(favoriteMoviesIdJson)
    var index = favoriteMoviesId.indexOf(movieId);
    if (index !== -1) favoriteMoviesId.splice(index, 1);
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMoviesId))
  }

  getFavouriteMoviesId(){
    let favoriteMoviesIdJson=localStorage.getItem('favoriteMovies');
    return JSON.parse(favoriteMoviesIdJson)
  }

  setLastSearchedPhrase(lastSearchedPhrase){
    localStorage.setItem('lastSearchedPhrase', JSON.stringify(lastSearchedPhrase))
  }

  getLastSearchedPhrase(){
    return JSON.parse(localStorage.getItem('lastSearchedPhrase'))
  }
  ///

  newEvent(event) {
    this._subject.next(event);
  }

  get events$ () {
    return this._subject.asObservable();
  }






  //

}
