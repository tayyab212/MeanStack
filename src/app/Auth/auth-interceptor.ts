import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class authInterceptor implements HttpInterceptor {
    constructor(private authService:AuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     debugger;
      const authToken = this.authService.getToken();
      if(authToken == undefined){
        const authRequest = req.clone({
          headers:req.headers.set("Authorization","Bearer" + authToken)
         });
       return next.handle(authRequest);
      }
      const authRequest = req.clone({
       headers:req.headers.set("Authorization", authToken.token)
      });
     return next.handle(authRequest);
  }
}