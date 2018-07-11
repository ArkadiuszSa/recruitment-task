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
  public abc='szipa';
  public numberOfFavouriteMovies;
  public pageNumber=1;
  private paginatorReset: EventEmitter<any> = new EventEmitter();
  private searchedPhrase='';

  constructor(
    private favouriteService: FavouriteService,
    private globalService: GlobalService
  ) { }

  ngOnInit() {
    if(!this.globalService.getFavouriteMoviesId()){
      this.numberOfFavouriteMovies=0;
    }else{
      this.numberOfFavouriteMovies=this.globalService.getFavouriteMoviesId().length;
    }
    this.reloadFavouriteMoviesList();

    this.globalService.events$.forEach(searchedPhrase =>{
      this.searchedPhrase=searchedPhrase;
      this.reloadFavouriteMoviesList();
      this.paginatorReset.next();
   })
  }

  removeMovieFromFavourites(movieId){
    this.globalService.removeMovieFromFavourites(movieId);
    this.reloadFavouriteMoviesList();
  }

  reloadFavouriteMoviesList(){
    let result=this.favouriteService.getFavouriteMovies(this.pageNumber,this.searchedPhrase);
    this.favouriteMovies=result.movies;
    this.numberOfFavouriteMovies=result.numberOfMovies;
    //this.numberOfFavouriteMovies=this.globalService.getFavouriteMoviesId().length;
    // this.favouriteService.getFavouriteMovies(this.pageNumber).subscribe(movie=>{
    //   this.favouriteMovies.push(movie);
    // });
  }

  public runSearch(){
    this.paginatorReset.next();
  }

  public paginationReload(pageNumber){
    this.pageNumber=pageNumber;
    this.reloadFavouriteMoviesList();
  }

}
