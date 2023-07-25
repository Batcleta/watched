import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { movieObject } from 'src/app/@types/movie-object-type';
import { movieWatched } from 'src/app/@types/movie-watched-type';
import { MovieService } from 'src/app/Services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {
  @Output() movieWatched = new EventEmitter<movieObject>();

  isModalOpen = false;
  back: string = '< Back';
  movies: movieObject[] = [];
  movie?: movieObject;

  private getMoviesSubscription: Subscription | undefined;
  private updateMoviesSubscription: Subscription | undefined;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.fetchMovies();
  }

  ngOnDestroy() {
    if (this.getMoviesSubscription) {
      this.getMoviesSubscription.unsubscribe();
    }
    if (this.updateMoviesSubscription) {
      this.updateMoviesSubscription.unsubscribe();
    }
  }

  fetchMovies() {
    this.getMoviesSubscription = this.movieService.getMoviesList().subscribe(
      (movies: movieObject[]) => {
        this.movies = movies;

        const movieIdFromRoute = Number(this.route.snapshot.paramMap.get('movieId'));
        this.movie = this.movies.find((movie) => movie.id === movieIdFromRoute);

        if (this.movie) {
          const date = new Date(this.movie.release_date);
          this.movie.release_date = date.toLocaleDateString().toString();
        }
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  onMovieWatched() {
    this.isModalOpen = true;
  }

  onCloseModal() {
    this.isModalOpen = false;
  }

  onModalSubmited(watchedParams: movieWatched) {
    this.onCloseModal();

    const movieIndex = this.movies.findIndex((m) => m.id === this.movie?.id);
    if (movieIndex !== -1) {
      // this.movies[movieIndex].watched = watchedParams.watched;
      // this.movies[movieIndex].rating = watchedParams.rating;
      // this.movies[movieIndex].comment = watchedParams.comment;

      this.movies[movieIndex] = {
        ...this.movies[movieIndex],
        ...watchedParams
      };

      this.movieService.updateMovie(this.movies[movieIndex]).subscribe(
        (updatedMovie: string) => {
          console.log('Movie updated successfully:', updatedMovie);
        },
        (error) => {
          console.error('Error updating movie:', error);
        }
      );
    }
  }

}
