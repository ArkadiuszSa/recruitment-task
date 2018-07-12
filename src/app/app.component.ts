import { Component, ViewChild, ContentChild  } from '@angular/core';
import { Router } from '@angular/router';
import {HomeComponent} from './components/home/home.component'
import {FavouriteComponent} from './components/favourite/favourite.component'
import { GlobalService } from './core/services/global.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ HomeComponent, FavouriteComponent ]

})
export class AppComponent {
  @ViewChild(HomeComponent) private homeComponent: HomeComponent;
  @ContentChild(FavouriteComponent) private favouriteComponent: FavouriteComponent;

  public redirectCondition:boolean;
  public searchedPhrase;
  constructor(
    private router: Router,
    private globalService: GlobalService
    
  ){
  }

  ngOnInit() {
    let lastSearchedPhrase=this.globalService.getLastSearchedPhrase();
    if(!lastSearchedPhrase){
      this.searchedPhrase='interview';
      this.globalService.setLastSearchedPhrase('interview');
    }else{
      this.searchedPhrase=this.globalService.getLastSearchedPhrase();
    }
    // this.homeComponent.searchMovies(this.searchedPhrase)

    
    if(this.router.url==='/'){
      //this.homeComponent.searchMovies(this.searchedPhrase)
    }else{
      
    }


    this.router.events.subscribe((val) =>{
      if(this.router.url==='/'){
        this.redirectCondition=true;
       
      }else{
        this.redirectCondition=false;
      }
    } )
  }

  runSearch(){
    let destination=this.router.url;
    this.globalService.newEvent({'searchedPhrase':this.searchedPhrase, 'destination':destination});
  }
}
