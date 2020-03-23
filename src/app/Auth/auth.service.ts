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
  private userId :string;
  constructor(private client: HttpClient, private router: Router) { }

 
getUserId(){
  return this.userId;
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
    const logindata: AuthData = { email: email, password: password };
    this.client.post<{ token: string, expiresIn: number,userId:string }>("http://localhost:3000/api/user/login", logindata)
      .subscribe(response => {
        const tok = response.token;
        this.token = tok;
        if (tok) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(tok, expirationDate,this.userId);
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
      this.userId = authInformation.userId;
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
    this.userId = null;
    this.router.navigate(["/"]);
  }

  getIsAuth() {
    return this.isAuthenticated;
  }
  private saveAuthData(token: string, expirationDate: Date,userId:string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId",userId)
  }
  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }


  private getAuthData() {
    const token = localStorage.getItem("token");
    this.token = token;
    const expirationDate = localStorage.getItem("expiration")
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId:userId
    }
  }



private setAuthTimer(duration:number){
  console.log("Setting timer :" + duration);
  this.tokenTimer = setTimeout(() => {
    this.onLogout();
  }, duration * 1000);
}

 
  getToken() {
    return this.getAuthData();
  }


}
