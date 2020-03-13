import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './authdata';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private isAuthenticated: boolean=false;
  private tokenTimer:NodeJS.Timer;
  private authStatusListener = new Subject<boolean>();

  constructor(private client: HttpClient,private router:Router) { }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  createUser(email: string, password: string) {
    const user: AuthData = { email: email, password: password }
    this.client.post("http://localhost:3000/api/user/signup", user)
      .subscribe(response => {
        console.log(response);
      })
  }

  login(email: string, password: string) {
    debugger;
    const logindata: AuthData = { email: email, password: password };
    this.client.post<{ token: string,expireIn:number }>("http://localhost:3000/api/user/login", logindata)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          console.log(token);
          console.log(response.expireIn);
          this.tokenTimer=setTimeout(() => {
            this.onLogout();
          }, expirtInDuration * 1000);
          const expirtInDuration = response.expireIn;
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(["/"]);
        }

      })
  }
  onLogout() {
    this.token = null;
    this.isAuthenticated =false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(["/"]);
  }

  getIsAuth(){
    return this.isAuthenticated;
  }
}
