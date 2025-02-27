import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public isloading = false;
  constructor(private authS: AuthService) { }


  onLogin(loginForm: NgForm) {
    if (loginForm.invalid)
      return;
    this.authS.login(loginForm.value.email, loginForm.value.password);
  }
}
