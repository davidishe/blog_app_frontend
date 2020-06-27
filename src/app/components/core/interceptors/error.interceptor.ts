import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (!req.url.includes('checkmail')) {
      next.handle(req).pipe(
        catchError(error => {
          if (error) {
            if (error.status === 400) {
              this.openSnackBar(error.error.message);
            }
            if (error.status === 401) {
              this.openSnackBar(error.error.message);
            }
            if (error.status === 404) {
              this.router.navigateByUrl('/notfound');
              this.openSnackBar(error.error.message);
            }
            if (error.status === 500) {
              this.router.navigateByUrl('/servererror');
              this.openSnackBar(error.error.message);
            }
          }
          return throwError(error);
        })
      );
      return next.handle(req);
    }


  }

  openSnackBar(message: string) {
    console.log(message);
  }

}
