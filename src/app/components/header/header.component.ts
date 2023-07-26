import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string = ""

  constructor(private userService: UserService) { }

  logout() {
    this.userService.logout()
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {

    const name = this.userService?.loggeduser
    if (name) {
      this.userName = name.name;
    } else {
      this.userName = "Guest";
    }
  }

}
