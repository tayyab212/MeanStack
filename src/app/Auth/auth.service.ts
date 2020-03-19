import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './authdata';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Data } from 'Backend/configuration';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private isAuthenticated: boolean = false;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;
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
    this.client.post<{ token: string, expiresIn: number }>("http://localhost:3000/api/user/login", logindata)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          debugger;
          const expiresInDuration = response.expiresIn;
          console.log(expiresInDuration);
          this.tokenTimer = setTimeout(() => {
            this.onLogout();
          }, expiresInDuration * 1000);

          console.log(token);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token,expirationDate);
          this.router.navigate(["/"]);
        }
      })
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
  }
  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }
}
