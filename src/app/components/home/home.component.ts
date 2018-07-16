import { Component, OnInit, EventEmitter } from '@angular/core';

import { HomeService } from'./home.service';
import { GlobalService } from '../../shared/services/global.service';
import { Movie } from './movie.model'
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public movies:Array<Movie>;
  public searchedPhrase:string = '';
  public searchSucces:boolean = true;
  public numberOfElements:number = 0;
  public pageNumber:number = 1;
  public reloadToPaginator: EventEmitter<any> = new EventEmitter();
  public searchEventSubs:Subscription;

  constructor(
    private homeService: HomeService,
    private globalService: GlobalService,
  ){}

  ngOnInit() {
    this.searchedPhrase = this.globalService.getLastSearchedPhrase();
    this.searchMovies(this.globalService.getLastSearchedPhrase(), 1);
    this.searchEventSubs=this.globalService.searchEvents$.subscribe(searchedPhrase => {
      this.pageNumber = 1;
      this.globalService.setLastSearchedPhrase(searchedPhrase);
      this.searchedPhrase = searchedPhrase;
      this.searchMovies(searchedPhrase, 1);
      this.reloadToPaginator.next([this.pageNumber, this.numberOfElements]);
    })
  }

  ngOnDestroy(){
    this.searchEventSubs.unsubscribe();
  }
  
  searchMovies(searchedPhrase:string, pageNumber:number){
    window.scrollTo(0, 0);
    this.homeService.getMovies(searchedPhrase, pageNumber).subscribe(res => {
      if(res !== 'error') {
        this.movies = res.movies;
        this.numberOfElements = res.numberOfResults;
        this.searchedPhrase = searchedPhrase;
        this.searchSucces = true;
        
      }else{
        this.movies = [];
        this.pageNumber = 1;
        this.searchSucces = false;
        this.numberOfElements = 0;
      }   
      this.reloadToPaginator.next([this.pageNumber, this.numberOfElements]);
    })
  }

  addMovieToFavourite(movie) {
    this.homeService.addMovieToFavourites(movie._id).subscribe();
    movie.isFavourite = true;
  }

  removeMovieFromFavourites(movie) {
    this.globalService.removeMovieFromFavourites(movie._id);
    movie.isFavourite = false;
  }

  reloadFromPaginator(pageNumber:number) {
    this.pageNumber = pageNumber;
    this.searchMovies(this.searchedPhrase, pageNumber);
  }
}
