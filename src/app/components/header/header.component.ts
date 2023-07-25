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
    if (name && Array.isArray(name) && name.length > 0) {
      // Assuming the first user in the array is the logged-in user, you can access its properties.
      this.userName = name[0].name;
    } else {
      this.userName = "Guest";
    }
  }

}
