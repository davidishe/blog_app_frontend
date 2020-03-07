import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})

export class AuthService {

token: string;
decodedToken: any;
logined = !this.token;
apiUrl = environment.authUrl;
jwtHelper = new JwtHelperService();


httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json; charset=utf-8'
  })
};

  constructor(
    public http: HttpClient,
    private router: Router
    // public _snackBar: MatSnackBar
  ) {}

  login(model: any) {
    return this.http.post<any>(this.apiUrl + 'login', model, this.httpOptions)

      .pipe(
        map((response: any) => {
        if (response) {
          this.router.navigate(['/items']);
          this.token = response.token;
          localStorage.setItem('app-token', this.token);
          this.decodedToken = this.jwtHelper.decodeToken(this.token);
          console.log(this.decodedToken.unique_name);
        }
      })
    );
  }

  authorize(model: any) {
    return this.http.post<any>(this.apiUrl + 'register', model, this.httpOptions)

      .pipe(
        map((response: any) => {
        if (response) {
          console.log(model);
          this.login(model);
        }
      })
    );
  }

  logedIn() {
    const token = localStorage.getItem('app-token');
    return !this.jwtHelper.isTokenExpired(token);
  }


}

