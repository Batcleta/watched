import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { userInfo } from '../@types/user-info';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly dbUrl = 'http://localhost:3004/users';

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  login(user: userInfo) {

    return this.userAuthentication(user).pipe(tap((response) => {
      if (!response.success) return;
      localStorage.setItem('token', btoa(JSON.stringify(response.token)));
      localStorage.setItem('user', btoa(JSON.stringify(response.user)));
      this.router.navigate(['']);
    }))
  }

  private userAuthentication(user: userInfo): Observable<any> {
    return this.httpClient.get<userInfo[]>(this.dbUrl).pipe(
      map((userResponse: userInfo[]) => {
        const response: any = {
          success: false,
        };

        const authenticatedUser = userResponse.find(
          (userObj: userInfo) =>
            userObj.email.toLowerCase() === user.email.toLowerCase() &&
            userObj.password === user.password
        );

        if (authenticatedUser) {
          response.success = true;
          response.user = authenticatedUser,
            response.token = "mylittletoken";
        }

        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP error:', error);
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  get loggeduser(): userInfo {
    let retrievedObject = localStorage.getItem('user');
    return retrievedObject
      ? JSON.parse(atob(retrievedObject))
      : null;
  }
}
