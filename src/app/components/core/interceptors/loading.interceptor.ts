import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, tap, catchError } from 'rxjs/operators';
import { BusyService } from 'src/app/services/infrastructure/busy.service';
import { error } from 'protractor';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private busyService: BusyService,
    private snackBar: MatSnackBar
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.busyService.isLoading(true);

    if (!req.url.includes('checkmail')) {
      return next.handle(req).pipe(
        finalize(() => {
          // this.busyService.isLoading(true);
        }),
        tap(event => {
          this.busyService.isLoading(true);
          if (event.type === HttpEventType.Response) {
          this.busyService.isLoading(true);
          if (event) {
              this.busyService.isLoading(false);
            }
          }
        }),
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            this.busyService.isLoading(false);
            console.log(err);
            this.openSnackBar('Произошла ошибка');

          } else {
            this.busyService.isLoading(false);
          }
          return of(err);
        })
      );
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }


}
