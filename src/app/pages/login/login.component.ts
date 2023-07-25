import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userInfo } from 'src/app/@types/user-info';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.formLogin.invalid) return;
    let user = this.formLogin.getRawValue() as userInfo;

    this.userService.login(user).subscribe((resp) => {
      if (!resp.success) {
        //snackbar or an alert 
        alert("Deu ruim")
      }
    })
  }
}