import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const token = localStorage.getItem('app-blog-token');
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ` + token
        }
      });
      return next.handle(req);
    }
    return next.handle(req);
  }
}
