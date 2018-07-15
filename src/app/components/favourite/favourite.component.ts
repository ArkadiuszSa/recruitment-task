import { Component, OnInit,EventEmitter } from '@angular/core';
import { FavouriteService } from './favourite.service'
import { GlobalService } from '../../core/services/global.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
  public favouriteMovies=[];
  public numberOfFavouriteMovies;
  public pageNumber=1;
  public buttonsReset: EventEmitter<any> = new EventEmitter();
  public searchedPhrase='';
  private condition=true;

  constructor(
    private favouriteService: FavouriteService,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    this.reloadFavouriteMoviesList('scroll');
    this.globalService.events$.forEach(event =>{
      this.pageNumber=1;
      this.searchedPhrase=event.searchedPhrase;
      this.reloadFavouriteMoviesList('scroll');
      this.buttonsReset.next([this.pageNumber,this.numberOfFavouriteMovies]);
   })
  }

  removeMovieFromFavourites(movieId){
    if((this.numberOfFavouriteMovies%10)===1){
      if(this.pageNumber>1) this.pageNumber--;
    }
    this.condition=false;
    this.globalService.removeMovieFromFavourites(movieId);
    this.reloadFavouriteMoviesList('jest');
  }

  reloadFavouriteMoviesList(scrollUp){

    if(this.condition){
      window.scrollTo(0,0);
    }else{
      this.condition=true;
    }
    let result=this.favouriteService.getFavouriteMovies(this.pageNumber,this.searchedPhrase);
    this.favouriteMovies=result.movies;
    this.numberOfFavouriteMovies=result.numberOfMovies;
    this.buttonsReset.next([this.pageNumber,this.numberOfFavouriteMovies]);
    }
  public paginationReload(pageNumber){
    this.pageNumber=pageNumber;
    this.reloadFavouriteMoviesList('scroll');
  }
}
