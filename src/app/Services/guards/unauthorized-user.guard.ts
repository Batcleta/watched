import { UserService } from '../user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class unauthorizedUserGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router) { }
  canActivate() {
    if (this.userService.loggeduser) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}