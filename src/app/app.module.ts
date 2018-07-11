import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FavouriteComponent } from './components/favourite/favourite.component';

import { HomeService } from'./components/home/home.service';
import { FavouriteService } from'./components/favourite/favourite.service';
import { GlobalService } from'./core/services/global.service';

import { AppRoutingModule } from './app-routing.module';
import { MyPaginatorComponent } from './core/components/my-paginator/my-paginator.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavouriteComponent,
    MyPaginatorComponent
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
