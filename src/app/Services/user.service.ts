import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { userInfo } from '../@types/user-info';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  login(user: userInfo) {

    //Fazer uma pesquisa na lista de usuarios

    let userResponse = { email: "", password: "" }

    if (userResponse.email === "hello@balta.io" && userResponse.password == "123") {
      localStorage.setItem('user', btoa(JSON.stringify(userResponse)));
      this.router.navigate(['']);
      return
    }

    alert("Usuário ou senha inválido")

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  get loggeduser(): userInfo {
    let retrievedObject = localStorage.getItem('usuario');
    return retrievedObject
      ? JSON.parse(atob(retrievedObject))
      : null;
  }
}
