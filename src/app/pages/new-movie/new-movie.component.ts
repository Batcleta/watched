import { Component, OnInit } from '@angular/core';
import { movieObject } from 'src/app/@types/movie-object-type';
import { MovieService } from 'src/app/Services/movie.service';
import { ThemoviedbService } from 'src/app/Services/themoviedb.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { themoviedbResponse } from 'src/app/@types/themoviedb-response-type';


@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit {
  back = '<< Back';
  searchForm!: FormGroup;
  apiMovies: movieObject[] = [];
  dbMovies: movieObject[] = [];

  constructor(
    private themovieodbService: ThemoviedbService,
    private movieService: MovieService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      searchQuery: ['', Validators.required]
    });
  }

  ngOnInit() { this.fetchMovies() }

  fetchMovies() {
    this.movieService.getMoviesList().subscribe(
      (movies: movieObject[]) => {
        this.dbMovies = movies
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  searchMovies() {
    if (this.searchForm.valid) {
      const movieName = this.searchForm.get('searchQuery')?.value;

      this.themovieodbService.searchMoviesFromApi(movieName).subscribe(
        (movies: themoviedbResponse) => {
          this.apiMovies = this.filterMovies(movies.results);
        },
        (error) => {
          console.error('Error fetching movies:', error);
        }
      );
    }
  }

  selectMovie(movie: movieObject) {
    console.log(movie)
    this.movieService.addNewMovie(movie)?.subscribe(
      (newMovie: movieObject | undefined) => {
        if (newMovie) {
          alert(`The movie ${newMovie?.original_title} was successfully added`);
        } else {
          alert('Movie already exists');
        }
      },
      (error) => {
        alert(error);
      }
    );
  }

  filterMovies(movies: movieObject[]): movieObject[] {
    return movies.filter(
      (movie) =>
        movie.overview &&
        movie.poster_path &&
        !this.isMovieAlreadyAdded(movie.id)
    );
  }





  isMovieAlreadyAdded(movieId: number): boolean {
    return this.dbMovies.some((movie) => movie.id === movieId);
  }
}
