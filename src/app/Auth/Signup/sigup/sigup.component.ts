import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../authservice.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sigup',
  templateUrl: './sigup.component.html',
  styleUrls: ['./sigup.component.css']
})
export class SigupComponent implements OnInit {
  public isloading =false;
  constructor(private authService:AuthserviceService) { }

  ngOnInit() {
  }
  onSignup(form:NgForm){
    debugger;
    if(form.invalid)
    return;
    this.authService.createUser(form.value.email,form.value.password);
  }

}
