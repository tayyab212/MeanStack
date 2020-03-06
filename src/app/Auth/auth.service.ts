import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './authdata';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private client:HttpClient) { }


  createUser(email:string,password:string){
    const user:AuthData ={email:email,password:password}
this.client.post("http://localhost:3000/api/user/signup",user)
.subscribe(response=>{
  console.log(response);
})
  }

  login(email:string,password:string){
    const login ={email:email,password:password};
this.client.post("http://localhost:3000/api/user/login",login)
.subscribe(response =>{
  console.log(response)
})
  }
}
