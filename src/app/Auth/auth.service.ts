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
  private isAuthenticated: boolean = false;
  private tokenTimer: NodeJS.Timer;
  private authStatusListener = new Subject<boolean>();

  constructor(private client: HttpClient, private router: Router) { }

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
    this.client.post<{ token: string, expireIn: number }>("http://localhost:3000/api/user/login", logindata)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          console.log(token);
          console.log(response.expireIn);
          this.setAuthTimer(expirtInDuration); 
          const expirtInDuration = response.expireIn;
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate =new Data(now.getTime() + expirtInDuration * 1000);
          this.saveAuthData(token,expirtInDuration); 
          this.router.navigate([""]);
        }

      })


        autoAuthData(){
          const authInformation = this.getAuthData();
          const now = new Date();
          const   = authInformation.expirationDate.getTime - now.getTime();
          if (!isInFuture) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.setAuthTimer()
            this.authStatusListener.next(true)
          }
        }
      
  onLogout() {
    this.token = null;
    this.isAuthenticated = false;    
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(["/"]);
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration",expirationDate.toISOString());
     

  private clearAuthData(){
    localStorage.removeIt em("token")
    localStorage.removeItem("expiration")
  }

  private getAuthData(){
    const token = local Storage.getItem("token")
    const expirationData = localStorage.getItem("expiration")
    if(!token || ! expirationData){
       return;  
    }
    return {
      token:token,
      expira tionDate : new Date(expirationData)
    }  
  }

 private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
          this.onLogout();
        }, duration * 1000);

      }
    
}
