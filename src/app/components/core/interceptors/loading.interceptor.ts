import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { BusyService } from 'src/app/services/infrastructure/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private busyService: BusyService,

  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.busyService.isLoading('loading');


    if (req.method === 'POST' && req.url.includes('orders')) {
      return next.handle(req);
    }

    if (!req.url.includes('checkmail')) {

      return next.handle(req).pipe(

        tap((event: HttpResponse<any>) => {
          // console.log(event);

          if (event.ok === true) {
          this.busyService.isLoading('notloading');
          // console.log('ЗАГРУЗКА ЗАВЕРШЕНА');

          }
        }),
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            this.busyService.isLoading('iserror');
            console.log(err);
            this.openSnackBar('Произошла ошибка');
          }
          return of(err);
        })
      );
    } else {
      return next.handle(req);
    }

  }

  openSnackBar(message: string) {
    console.log(message);
  }


}
