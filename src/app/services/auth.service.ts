import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, Subject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})

export class AuthService {

token: string;
userId: number;
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
    private router: Router,
    private userService: UserService
  ) {}

  login(user: any) {
    return this.http.post<any>(this.apiUrl + 'login', user, this.httpOptions)

      .pipe(
        map((response: any) => {
        if (response) {
          this.router.navigate(['/items']);
          this.token = response.token;
          this.userId = response.userId;
          console.log('респонс это - ');
          console.log(response);
          console.log('айдишник это - ' + response.userId);


          localStorage.setItem('app-token', this.token);
          localStorage.setItem('userId', this.userId.toString());

          this.decodedToken = this.jwtHelper.decodeToken(this.token);
          console.log(this.decodedToken.unique_name);
        }
      })
    );
  }

  authorize(user: any) {
    return this.http.post<any>(this.apiUrl + 'register', user, this.httpOptions)

      .pipe(
        map((response: any) => {
        if (response) {
          console.log(response);
          this.login(user);
        }
      })
    );
  }

  logedIn() {
    const token = localStorage.getItem('app-token');
    this.userId = + localStorage.getItem('userId');
    return !this.jwtHelper.isTokenExpired(token);
  }


}

