import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {UserService} from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptorService implements  HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token')
        },
        setParams: {
          currentRole: UserService.getCurrentRole()
        }
      });
    }
    return next.handle(req);
  }
}
