import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../../layouts/account/account.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({  providedIn: 'root'})

export class AuthGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(auth => {
        if (auth) { return true; }
        this.openSnackBar('сначала авторизуйся');
        this.router.navigate(['account'], {queryParams: {returnUrl: state.url}});
      })
    );

  }

  openSnackBar(message: string) {
    console.log(message);
  }

}
