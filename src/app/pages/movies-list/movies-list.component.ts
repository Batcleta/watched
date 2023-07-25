import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { movieObject } from 'src/app/@types/movie-object-type';
import { MovieService } from 'src/app/Services/movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies: movieObject[] = [];
  watchedMovie!: movieObject;

  private moviesSubscription: Subscription | undefined;

  constructor(private movieService: MovieService) { }

  get nonWatchedMovies(): any[] {
    return this.movies.filter((movie) => !movie.watched);
  }

  get watchedMovies(): any[] {
    return this.movies.filter((movie) => movie.watched);
  }

  ngOnInit() {
    this.fetchMovies();
  }

  ngOnDestroy() {
    if (this.moviesSubscription) {
      this.moviesSubscription.unsubscribe();
    }
  }

  fetchMovies() {
    this.moviesSubscription = this.movieService.getMoviesList().subscribe(
      (movies: movieObject[]) => {
        this.movies = movies;
      },
      (error) => {
        console.error('Error fetching movies:', error);
      });
  }

  onMovieExcluded(movie: movieObject) {
    try {
      this.movieService.deleteMovie(movie);
      window.location.reload()
      alert('Movie deleted successfully:');
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  }
}
