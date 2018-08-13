# Edge [Live](https://edge-recruitment.herokuapp.com/)

Main techs:
* Angular 5
* RxJS
* pure CSS/SCSS

The application consists of 2 views:
* result of searchied movies by the phrase
* list of favourite movies

There is a 4 components: 
* AppComponent - layout, navigation beetwen views and input for searching
* HomeComponent - with searching results
* FavouriteComponent - with list of favourite movies
* PaginatorComponent - reusable paginator used in both views

As api was used http://www.omdbapi.com/. Favourite movies are stored in the localStorage. AppComponent communicates with both views via the service. HomeComponent and FavouriteComponent comminicates with paginator by Input event. Omdapi only allows to get 10 movies on request so I used forkJoin to piece together the respons. App should be fully reponsive beetwen 360px and 1920px. 

![Image1](https://preview.ibb.co/g36UAp/1.png)
![Image2](https://preview.ibb.co/gt1wqp/2.png)
