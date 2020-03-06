import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sigup',
  templateUrl: './sigup.component.html',
  styleUrls: ['./sigup.component.css']
})
export class SigupComponent implements OnInit {
  public isloading =false;
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }
  onSignup(form:NgForm){
    debugger;
    if(form.invalid)
    return;
    this.authService.createUser(form.value.email,form.value.password);
  }

}
