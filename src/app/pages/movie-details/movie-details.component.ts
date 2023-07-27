import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  movie?: movieObject;

  private getMoviesSubscription: Subscription | undefined;
  private updateMoviesSubscription: Subscription | undefined;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const movieIdFromRoute = Number(this.route.snapshot.paramMap.get('movieId'));
    this.fetchMovies(movieIdFromRoute);
  }

  ngOnDestroy() {
    if (this.getMoviesSubscription) {
      this.getMoviesSubscription.unsubscribe();
    }
    if (this.updateMoviesSubscription) {
      this.updateMoviesSubscription.unsubscribe();
    }
  }

  fetchMovies(movieId: number) {
    this.getMoviesSubscription = this.movieService.getMovieById(movieId).subscribe(
      (movie: movieObject | null) => {
        if (movie) {
          this.movie = movie;
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
    if (this.movie) {

      this.movie = { ...this.movie, ...watchedParams }

      this.movieService.updateMovie(this.movie).subscribe(
        (updatedMovie: string) => {
          alert('Movie updated successfully:' + updatedMovie);
          this.router.navigate([""])
        },
        (error) => {
          console.error('Error updating movie:', error);
        }
      );

    }


  }

}
