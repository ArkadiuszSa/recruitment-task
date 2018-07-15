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

  constructor(
    private favouriteService: FavouriteService,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    this.reloadFavouriteMoviesList();
    this.globalService.events$.forEach(event =>{
      this.pageNumber=1;
      this.searchedPhrase=event.searchedPhrase;
      this.reloadFavouriteMoviesList();
      this.buttonsReset.next(1);
   })
  }

  removeMovieFromFavourites(movieId){
    if((this.numberOfFavouriteMovies%10)===1){
      if(this.pageNumber>1) this.pageNumber--;
    }
    this.globalService.removeMovieFromFavourites(movieId);
    this.buttonsReset.next(this.pageNumber);
  }

  reloadFavouriteMoviesList(){
    window.scrollTo(0,0);
    let result=this.favouriteService.getFavouriteMovies(this.pageNumber,this.searchedPhrase);
    this.favouriteMovies=result.movies;
    this.numberOfFavouriteMovies=result.numberOfMovies;
  }
  public paginationReload(pageNumber){
    this.pageNumber=pageNumber;
    this.reloadFavouriteMoviesList();
  }
}
