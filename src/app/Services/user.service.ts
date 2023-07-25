import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { userInfo } from '../@types/user-info';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  login(user: userInfo) {

    return this.userAuthentication(user).pipe(tap((response) => {
      if (!response.success) return;
      localStorage.setItem('token', btoa(JSON.stringify(response.token)));
      localStorage.setItem('user', btoa(JSON.stringify(user)));
      this.router.navigate(['']);
    }))
  }

  private userAuthentication(user: userInfo): Observable<any> {
    const response: any = {};

    //Fazer uma pesquisa na lista de users
    let userResponse = { email: "", password: "" }

    if (user.email === userResponse.email && user.password == userResponse.password) {
      response.success = true;
      response.user = user;
      response.token = "mylittletoken";
      return of(response);
    }

    response.success = false;
    response.user = user;
    return of(response);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  loggeduser(): userInfo {
    let retrievedObject = localStorage.getItem('usuario');
    return retrievedObject
      ? JSON.parse(atob(retrievedObject))
      : null;
  }
}
