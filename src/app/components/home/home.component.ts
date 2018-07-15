import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HomeService } from'./home.service';
import { GlobalService } from '../../core/services/global.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public movies;
  public searchedPhrase='';
  public searchSucces=true;
  public numberOfElements;
  public pageNumber=1;
  public buttonsReset: EventEmitter<any> = new EventEmitter();
  constructor(
    private homeService: HomeService,
    private globalService: GlobalService,
  ){}

  ngOnInit() {
    this.searchedPhrase=this.globalService.getLastSearchedPhrase();
    this.searchMovies(this.globalService.getLastSearchedPhrase(),1);

    this.globalService.events$.forEach(event =>{
      if(event.destination==='/'){
        this.pageNumber=1;
        this.globalService.setLastSearchedPhrase(event.searchedPhrase);
        this.searchedPhrase=event.searchedPhrase;
        this.searchMovies(event.searchedPhrase,1);
        this.buttonsReset.next(1);
      }
    })
  }
  
  searchMovies(searchedPhrase, pageNumber){
    window.scrollTo(0,0);
    this.homeService.getMovies(searchedPhrase, pageNumber).subscribe(res => {
      if(res!=='error') {
        this.movies=res.movies;
        this.numberOfElements=res.numberOfResults;
        this.searchedPhrase=searchedPhrase;
        this.searchSucces=true;
        
      }else{
        this.movies=[];
        this.pageNumber=1;
        this.searchSucces=false;
        this.numberOfElements=0;
      }    
    })
  }

  addMovieToFavourite(movie) {
    this.homeService.addMovieToFavourites(movie._id).subscribe();
    movie.isFavourite=true;
  }

  removeMovieFromFavourites(movie) {
    this.globalService.removeMovieFromFavourites(movie._id);
    movie.isFavourite=false;
  }

  paginationReload(pageNumber) {
    this.pageNumber=pageNumber;
    this.searchMovies(this.searchedPhrase, pageNumber);
  }
}
