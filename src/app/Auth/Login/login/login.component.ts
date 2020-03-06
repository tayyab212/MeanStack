import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthserviceService } from '../../authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isloading =false;
  constructor(private authService:AuthserviceService) { }

  ngOnInit() {
  }
  onLogin(loginForm:NgForm){
if(loginForm.invalid)
return;
this.authService.login(loginForm.value.email,loginForm.value.passord);
  }
}
