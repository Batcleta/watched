import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { movieObject } from '../@types/movie-object-type';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly dbUrl = 'http://localhost:3004/movies';

  constructor(private http: HttpClient) { }

  getMoviesList(): Observable<movieObject[]> {
    return from(this.http.get<movieObject[]>(this.dbUrl)).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  updateMovie(movie: movieObject): Observable<string> {
    const url = `${this.dbUrl}/${movie.id}`;
    return from(this.http.put<movieObject>(url, movie)).pipe(
      map(() => "Filme atualizado com sucesso"),
      catchError((error) => {
        throw error;
      }),
    );
  }

  addNewMovie(movie: movieObject): Observable<movieObject> {

    return this.checkIfExists(movie).pipe(
      switchMap((exists: boolean) => {

        if (exists) {
          throw new Error('Movie with the same ID already exists.');
        }

        return this.http.post<movieObject>(this.dbUrl, movie).pipe(
          catchError((error) => {
            throw error;
          })
        );
      })
    );
  }

  deleteMovie(movie: movieObject): string {
    try {
      const url = `${this.dbUrl}/${movie.id}`
      this.http.delete<movieObject>(url).subscribe((resp: any) => console.log(resp))
      return "Deleted succesfully";
    } catch (error) {
      throw error;
    }

  }

  getMovieById(movieId: number): Observable<movieObject | null> {
    const url = `${this.dbUrl}/${movieId}`;

    console.log(url)
    return this.http.get<movieObject>(url).pipe(
      catchError((error) => {

        if (error.status === 404) {
          return of(null);
        }
        throw error;
      })
    );
  }

  checkIfExists(movie: movieObject): Observable<boolean> {
    return this.getMovieById(movie.id).pipe(
      map((movie: movieObject | null) => !!movie?.id)
    );
  }
}
