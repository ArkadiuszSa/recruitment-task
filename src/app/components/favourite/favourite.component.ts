import { Component, OnInit,EventEmitter } from '@angular/core';
import { FavouriteService } from './favourite.service'
import { GlobalService } from '../../shared/services/global.service';
import { FavouriteMovie } from './favourite-movie.model'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
  public favouriteMovies:Array<FavouriteMovie> = [];
  public numberOfFavouriteMovies:number;
  public pageNumber:number = 1;
  public reloadToPaginator: EventEmitter<any> = new EventEmitter();
  public searchedPhrase:string = '';
  private scrollCondition:boolean = true;
  public searchEventSubs:Subscription;
  constructor(
    private favouriteService: FavouriteService,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    this.reloadFavouriteMoviesList();

    this.searchEventSubs=this.globalService.searchEvents$.subscribe(searchedPhrase => {
      this.pageNumber = 1;
      this.searchedPhrase = searchedPhrase;
      this.reloadFavouriteMoviesList();
      this.reloadToPaginator.next([this.pageNumber, this.numberOfFavouriteMovies]);
    })
  }

  ngOnDestroy(){
    this.searchEventSubs.unsubscribe();
  }

  removeMovieFromFavourites(movieId){
    if((this.numberOfFavouriteMovies %10) === 1){
      if(this.pageNumber > 1) this.pageNumber--;
    }
    this.scrollCondition = false;
    this.globalService.removeMovieFromFavourites(movieId);
    this.reloadFavouriteMoviesList();
  }

  reloadFavouriteMoviesList() {
    if(this.scrollCondition){
      window.scrollTo(0, 0);
    }else{
      this.scrollCondition = true;
    }
    let result = this.favouriteService.getFavouriteMovies(this.pageNumber, this.searchedPhrase);
    this.favouriteMovies = result.favouriteMovies;
    this.numberOfFavouriteMovies = result.numberOfMovies;
    this.reloadToPaginator.next([this.pageNumber, this.numberOfFavouriteMovies]);
    }
    public reloadFromPaginator(pageNumber){
      this.pageNumber = pageNumber;
      this.reloadFavouriteMoviesList();
    }
}
