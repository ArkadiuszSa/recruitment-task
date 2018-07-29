import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HomeService } from './home.service';
import { GlobalService } from '../../shared/services/global.service';
import { TestMockData } from '../../tests-mock-data'
import { TestingCompilerFactoryImpl } from '../../../../node_modules/@angular/platform-browser-dynamic/testing/src/compiler_factory';
describe('HomeService', () => {
  let httpMock: HttpTestingController;
  let testMockData: TestMockData;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        //HttpClientModule,
        //TestMockData,
        HttpClientTestingModule
        
      ],
      providers: [HomeService, GlobalService]
    });
    testMockData = new TestMockData();
    httpMock = TestBed.get(HttpTestingController);
  });

//   let mockData=[
//     {Title: "The Interview", Year: "2014", imdbID: "tt2788710", Type: "movie",
//      Poster: "https://m.media-amazon.com/images/M/MV5BMTQzMTcwMzgyMV5BMl5BanBnXkFtZTgwMzAyMzQ2MzE@._V1_SX300.jpg"},
//     {Title: "Interview with the Vampire: The Vampire Chronicles", Year: "1994", imdbID: "tt0110148", Type: "movie", 
//     Poster: "https://m.media-amazon.com/images/M/MV5BYThmYjJhMG…zY0MzFmXkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_SX300.jpg"}
//   ];
//   it('should be created', inject([HomeService], (service: HomeService) => {
//     expect(service).toBeTruthy();
//   }));

  // it('should return searched movies ', inject([HomeService], (service: HomeService) => {
  //   let request1 = httpMock.expectOne('https://www.omdbapi.com/?apikey=34286e10'+ '&s='+'interview'+ '&page='+1)
  //   let request2 = httpMock.expectOne('https://www.omdbapi.com/?apikey=34286e10'+ '&s='+'interview'+ '&page='+2)
    
  //   service.getMovies('interview',1).subscribe(posts=>{
  //     expect(posts).toEqual(mockData)
  //   })
    
  //   expect(request1.request.method).toBe('GET');
  //   expect(request2.request.method).toBe('GET');
  //   request1.flush(mockData)
  //   request2.flush(mockData)
  //   httpMock.verify();
  // }));

  // it('should return movie and add it to favourties', inject([HomeService], (service: HomeService) => {
  //   let request = httpMock.expectOne('https://www.omdbapi.com/?apikey=34286e10'+ '&i=' + '1')
  //   let mockData = {
  //     Title: "The Interview", Year: "2014", imdbID: "tt2788710", Type: "movie",
  //     Poster: "https://m.media-amazon.com/images/M/MV5BMTQzMTcwMzgyMV5BMl5BanBnXkFtZTgwMzAyMzQ2MzE@._V1_SX300.jpg"
  //   }
      
  //   spyOn(service, 'favouriteMovies')
  //   service.addMovieToFavourites('1').subscribe(posts=>{
  //     console.log(service.favouriteMovies)
  //     expect(posts).toEqual(mockData)
  //   })
    
  //   expect(request.request.method).toBe('GET');
  //   request.flush(mockData)
  //   httpMock.verify();
  //   done();
  // }));

  let mockLocalStorageGet = () => {
    return '[]';
  }
  let mockLocalStorageSet = () =>{}

  it('should return movie and add it to favourties', async( (done) => {
    let service=TestBed.get(HomeService)
    // let mockFavouriteMovieData = {
    //   Title: "The Interview", Year: "2014", imdbID: "tt2788710", Type: "movie",
    //   Poster: "https://m.media-amazon.com/images/M/MV5BMTQzMTcwMzgyMV5BMl5BanBnXkFtZTgwMzAyMzQ2MzE@._V1_SX300.jpg"
    // }
    // let mockFavouriteMovie = {
    //   title: "The Interview", year: "2014", _id: "tt2788710", type: "movie",
    //   posterUrl: "https://m.media-amazon.com/images/M/MV5BMTQzMTcwMzgyMV5BMl5BanBnXkFtZTgwMzAyMzQ2MzE@._V1_SX300.jpg"
    // }
    let mockFavouriteMovieData=testMockData.mockFavouriteMovieData;
    let mockFavouriteMovie=testMockData.mockFavouriteMovie
      
    localStorage.getItem = mockLocalStorageGet;
    localStorage.setItem = mockLocalStorageSet;

    service.addMovieToFavourites('1').subscribe(posts=>{
      expect(service.favouriteMovies[0]).toEqual(mockFavouriteMovie)
    })

    let request = httpMock.expectOne('https://www.omdbapi.com/?apikey=34286e10'+ '&i=' + '1')
    expect(request.request.method).toBe('GET');
    request.flush(mockFavouriteMovieData)
    httpMock.verify();
    
  }));

  it('should return 12 movies for given page', async( (done) => {
    let service=TestBed.get(HomeService)
    let mockFavouriteMoviesData 
    let mockFavouriteMovies = {
      title: "The Interview", year: "2014", _id: "tt2788710", type: "movie",
      posterUrl: "https://m.media-amazon.com/images/M/MV5BMTQzMTcwMzgyMV5BMl5BanBnXkFtZTgwMzAyMzQ2MzE@._V1_SX300.jpg"
    }

    service.getMovies('interview',1).subscribe(posts=>{
      expect(1).toEqual(0)
      console.log('dzialam')
    })

    let request1 = httpMock.expectOne('https://www.omdbapi.com/?apikey=34286e10&s=interview&page=1')
    let request2 = httpMock.expectOne('https://www.omdbapi.com/?apikey=34286e10&s=interview&page=2')
    expect(request1.request.method).toBe('GET');
    request1.flush(testMockData.searchMoviesData1)
    expect(request2.request.method).toBe('GET');
    request2.flush(testMockData.searchMoviesData2)
    httpMock.verify();
  }));
});
