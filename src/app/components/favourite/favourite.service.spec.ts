import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FavouriteService } from './favourite.service';
import { FavouriteMovie } from './favourite-movie.model'
import { GlobalService } from '../../shared/services/global.service';
import { globalAgent } from 'https';

describe('FavouriteMoviesService',()=>{
  
    beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavouriteService, GlobalService]
    });

  });

  let typeGuard=(favouriteMovie)=>{
    return (
      favouriteMovie._id!==undefined&&
      favouriteMovie.posterUrl!==undefined&&
      favouriteMovie.title!==undefined&&
      favouriteMovie.year!==undefined&&
      favouriteMovie.type!==undefined
    )
  }
  let getMovieMock=()=>{
    return [
      {
        _id: "tt2788710", 
        posterUrl: "https://m.media-amazon.com/images/M/MV5BMTQzMTcwMzgyMV5BMl5BanBnXkFtZTgwMzAyMzQ2MzE@._V1_SX300.jpg",
        title: "The Interview", type: "movie", year: "2014"
      },
      {
        _id: "tt0110148", 
        posterUrl: "https://m.media-amazon.com/images/M/MV5BYThmYjJhMG…zY0MzFmXkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_SX300.jpg",
        title: "Interview with the Vampire: The Vampire Chronicles", type: "movie", year: "1994"
      }
    ]
  }
    it('should return favourtie movies', inject([FavouriteService], (service: FavouriteService) => {
      let globalService=TestBed.get(GlobalService)
      spyOn(globalService, 'getFavouriteMovies')
      globalService.getFavouriteMovies=getMovieMock;
      let result=service.getFavouriteMovies(1,'');
      expect(typeGuard(result.favouriteMovies[0]))
    }));
})
