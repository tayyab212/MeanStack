import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './authdata';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private token:string;
private authStatusListener =new Subject<boolean>();

  constructor(private client:HttpClient) { }

getToken(){
  return this.token;
}

getAuthStatusListener(){
  return this.authStatusListener.asObservable();
}
  createUser(email:string,password:string){
    const user:AuthData ={email:email,password:password}
 this.client.post("http://localhost:3000/api/user/signup",user)
.subscribe(response=>{
  console.log(response);
})
  }

  login(email:string,password:string){
    debugger;
    const logindata:AuthData = {email:email,password:password};
    this.client.post<{token:string}>("http://localhost:3000/api/user/login",logindata)
.subscribe(response =>{
 const token = response.token;
 this.token = token;
 console.log(token);
 this.authStatusListener.next(true);
})
  }
}
