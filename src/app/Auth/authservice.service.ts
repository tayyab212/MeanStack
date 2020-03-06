import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './authdata.model';


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private clien :HttpClient) { }

  createUser(email: string, password: string) {
    const authData:AuthData = {email:email,password:password};
    this.clien.put("http://localhost:3000/api/user/signup",authData)
    .subscribe(response => {
      console.log(response);
    });
  }

  login(email:string,password:string) {
    const authData:AuthData = {email:email,password:password};
    this.clien.post("http://localhost:3000/api/user/login",authData)
    .subscribe(response => {
      console.log(response);
    });
  }
}
