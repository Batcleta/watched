import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { themoviedbResponse } from '../@types/themoviedb-response-type';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ThemoviedbService {
  constructor(private http: HttpClient) { }

  private apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjkwZTdiN2ZlMjcxMmQ5OTY5NWM0NTczMWY2ZGI3MiIsInN1YiI6IjY0OWMyNDEyZmQ0ZjgwMDEwZDk4YWI0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pyZGT1Z8mvq_BZ_Zu8zqmAehmQq4VPvuQxn5LLSacbU';

  searchMoviesFromApi(movieName: string): Observable<themoviedbResponse> {
    const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${this.apiToken}`
    };

    return this.http.get<themoviedbResponse>(url, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching movies:', error);
        return throwError('Something went wrong. Please try again later.'); // Throw a custom error message.
      })
    );
  }
}
