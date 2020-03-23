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
  public token: string ="";
  private isAuthenticated: boolean = false;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;
  constructor(private client: HttpClient, private router: Router) { }

 

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
        const tok = response.token;
        this.token = tok;
        if (tok) {
          debugger;
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          console.log(expiresInDuration);
          console.log(tok);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(tok, expirationDate);
          this.router.navigate(["/"]);
        }
      })
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0){
      this.token=authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn /1000);
      this.authStatusListener.next(true);
    }
  }

  onLogout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  getIsAuth() {
    return this.isAuthenticated;
  }
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }
  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

private setAuthTimer(duration:number){
  console.log("Setting timer :" + duration);
  this.tokenTimer = setTimeout(() => {
    this.onLogout();
  }, duration * 1000);
}

  private getAuthData() {
    const token = localStorage.getItem("token");
    this.token = token;
    const expirationDate = localStorage.getItem("expiration")
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

  getToken() {
    return this.getAuthData();
  }


}
