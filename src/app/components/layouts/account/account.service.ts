import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { IUser, User } from 'src/app/shared/models/user/user';
import { HttpClient } from '@angular/common/http';
import { IAddress } from 'src/app/shared/models/user/address';
import { ToastService } from 'src/app/services/infrastructure/toast.service';

@Injectable({providedIn: 'root'})

export class AccountService {

  baseUrl = environment.authUrl;
  private currentUserSource = new BehaviorSubject<IUser>(null);
  currentUser$ = this.currentUserSource.asObservable();

  userId: number;
  decodedToken: any;



  constructor(
    public http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {}

  login(values: any) {
    return this.http.post<any>(this.baseUrl + 'login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('app-blog-token', user.token);
          this.currentUserSource.next(user);
          this.toastService.setToast('success', 'привет!');
        }
      })
    );
  }

  register(values: any) {
    return this.http.post<any>(this.baseUrl + 'register', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('app-blog-token', user.token);
          this.currentUserSource.next(user);
          this.router.navigateByUrl('/');
        }
      }, err => {
        console.log(err);
      })
    );
  }

  logout() {
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
    localStorage.removeItem('app-blog-token');
    this.openSnackBar('до новой встречи ))');
  }

  checkEmailExists(email: string) {
    return this.http.get<any>(this.baseUrl + 'checkmail/?email=' + email);
  }

  loadCurrentUser() {
    return this.http.get(this.baseUrl + 'current').pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('app-blog-token', user.token);
          localStorage.setItem('app-blog-user-id', JSON.stringify(user.id));
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
    this.userId = + localStorage.getItem('userId');
    return true;
  }


  checkEmailNotTaken(email: string) {
    return this.http.get<any>(this.baseUrl + 'checkmail/?email=' + email).pipe(
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
    console.log(message);
  }


}

