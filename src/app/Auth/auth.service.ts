import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './authdata';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private token:string;
  constructor(private client:HttpClient) { }

getToken(){
  return this.token;
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
})
  }
}
