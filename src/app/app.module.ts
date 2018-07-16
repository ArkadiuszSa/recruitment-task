import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { PaginatorComponent } from './shared/components/paginator/paginator.component';

import { HomeService } from'./components/home/home.service';
import { FavouriteService } from'./components/favourite/favourite.service';
import { GlobalService } from'./shared/services/global.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavouriteComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    HomeService,
    FavouriteService,
    GlobalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
