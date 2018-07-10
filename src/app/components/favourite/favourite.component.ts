import { Component, OnInit } from '@angular/core';
import { PaginatorComponent } from '../../core/components/paginator/paginator.component';
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


  constructor(
    private favouriteService: FavouriteService,
    private globalService: GlobalService
  ) { }

  ngOnInit() {
    this.numberOfFavouriteMovies=this.globalService.getFavouriteMoviesId().length;
    this.reloadFavouriteMoviesList();
  }

  removeMovieFromFavourites(movieId){
    this.globalService.removeMovieIdFromFavourites(movieId);
    this.reloadFavouriteMoviesList();
  }

  reloadFavouriteMoviesList(){
    console.log(this.pageNumber)
    this.favouriteMovies=[];
    this.favouriteService.getFavouriteMovies(this.pageNumber).subscribe(movie=>{
      this.favouriteMovies.push(movie);
    });
  }

  public runSearch(){
    console.log('favourite')
  }

  public paginationReload(pageNumber){
    this.pageNumber=pageNumber;
    this.reloadFavouriteMoviesList();
  }

}
