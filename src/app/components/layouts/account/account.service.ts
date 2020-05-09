import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap, delay } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'src/app/shared/models/user/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { IAddress } from 'src/app/shared/models/user/address';

@Injectable({providedIn: 'root'})

export class AccountService {


  baseUrl = environment.authUrl;
  private currentUserSource = new BehaviorSubject<IUser>(null);
  currentUser$ = this.currentUserSource.asObservable();

  userId: number;
  decodedToken: any;
  jwtHelper = new JwtHelperService();


  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type':  'application/json; charset=utf-8',
  //     Authorization: 'Bearer ' + localStorage.getItem('garden-app-token')
  //   })
  // };

  constructor(
    public http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  login(values: any) {
    return this.http.post<any>(this.baseUrl + 'login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('garden-app-token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(values: any) {
    return this.http.post<any>(this.baseUrl + 'register', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('garden-app-token', user.token);
          this.currentUserSource.next(user);
          this.router.navigateByUrl('/shop');
        }
      }, err => {
        console.log(err);
      })
    );
  }

  logout() {
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
    localStorage.removeItem('garden-app-token');
    this.openSnackBar('до новой встречи ))');
  }

  checkEmailExists(email: string) {
    return this.http.get<any>(this.baseUrl + 'checkmail/?email=' + email);
  }

  checkEmailExists2(email: string) {
    return this.http.get<any>(this.baseUrl + 'checkmail/?email=' + email).pipe(
      map((res: any) => {
        if (res) {
          console.log(res);
        }
      }, err => {
        console.log(err);
      })
    );
  }

  loadCurrentUser() {
    return this.http.get(this.baseUrl + 'current').pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  getCurrentUserValue() {
    return this.currentUserSource.value;
  }


  authorize(user: any) {
    return this.http.post<any>(this.baseUrl + 'register', user)
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
    const token = localStorage.getItem('garden-app-token');
    this.userId = + localStorage.getItem('userId');
    return !this.jwtHelper.isTokenExpired(token);
  }


  checkEmailNotTaken(email: string) {
    return this.http.get<any>(this.baseUrl + 'checkmail/?email=' + email).pipe(
      delay(1000),
      map(res => {
        console.log(res);
        return res;
      })
    );
  }

  getUserAddress() {
    return this.http.get(this.baseUrl + 'address');
  }

  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(this.baseUrl + 'address', address);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }


}

