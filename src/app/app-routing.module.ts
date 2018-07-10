import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FavouriteComponent } from './components/favourite/favourite.component';

const routes: Routes = [
      {
        path:'',
        component:HomeComponent
      },
      {
        path: 'favourites',
        component:FavouriteComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
  
})

export class AppRoutingModule {}