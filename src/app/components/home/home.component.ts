import { Component, OnInit,ChangeDetectorRef, NgZone,  ApplicationRef, Output, EventEmitter } from '@angular/core';
import { HomeService } from'./home.service';
import { GlobalService } from '../../core/services/global.service';
import {} from './../../core/components/my-paginator/my-paginator.component'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Output() public myEmitter = new EventEmitter();
  public image='https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg';
  public movies;
  public searchedPhrase;
  public searchSucces;
  public numberOfElements;
  public actualPage;
  constructor(
    private homeService: HomeService,
    private globalService: GlobalService,
  ){}

  ngOnInit() {
    this.searchedPhrase=this.globalService.getLastSearchedPhrase();
    this.searchMovies(this.globalService.getLastSearchedPhrase(),1);

   this.globalService.events$.forEach(searchedPhrase =>{
      this.globalService.setLastSearchedPhrase(searchedPhrase);
      this.searchMovies(searchedPhrase,1);
   })
  }

  searchMovies(searchedPhrase, pageNumber){
    this.homeService.getMovies(searchedPhrase, pageNumber).subscribe(res=>{
      if(res!=='error'){
        this.searchedPhrase=searchedPhrase;
        this.movies=res.movies;
        this.numberOfElements=res.numberOfResults;
        this.searchSucces=true;
      }else{
        this.movies=[];
        this.searchSucces=false;
      }    
    })
  }

  addMovieToFavourite(movie){
    this.globalService.addMovieIdToFavourites(movie._id);
    movie.isFavourite=true;
  }

  removeMovieFromFavourites(movie){
    this.globalService.removeMovieIdFromFavourites(movie._id);
    movie.isFavourite=false;
  }

  paginationReload(pageNumber){
    this.searchMovies(this.searchedPhrase, pageNumber);
    console.log(pageNumber);
  }
}
