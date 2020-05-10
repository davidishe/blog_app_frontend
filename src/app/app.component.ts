import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BusyService } from './services/infrastructure/busy.service';
import { Subscription } from 'rxjs';
import { BasketService } from './components/content/basket/basket.service';
import { error } from 'protractor';
import { AccountService } from './components/layouts/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Цветкофф';
  jwtHelper = new JwtHelperService();
  sub: Subscription;


  constructor(
    public busyService: BusyService,
    private ref: ChangeDetectorRef,
    private basketService: BasketService,
    private accountService: AccountService
  ) {

    }

  ngOnInit(): void {
    this.ref.markForCheck();
    this.loadBasket();
    this.loadCurrentUser();
  }


  loadCurrentUser() {
    const token = localStorage.getItem('garden-app-token');
    if (token) {
      this.accountService.loadCurrentUser().subscribe(() => {
      }, err => {
        console.log(err);
      });
    }
  }

  loadBasket() {
    const basketId = localStorage.getItem('app-basket-id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('bask init');
      }, err => {
        console.log(err);
      });
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
