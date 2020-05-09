import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SideNavService } from 'src/app/services/side-nav.service';
import { BusyService } from 'src/app/services/infrastructure/busy.service';
import { Subscription, Observable } from 'rxjs';
import { BasketService } from '../../content/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { AccountService } from '../account/account.service';
import { IUser } from 'src/app/shared/models/user/user';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})

export class NavMenuComponent implements OnInit, OnDestroy {

  status$: boolean;
  currentUser$: Observable<IUser>;

  visibility = true;
  username: string;
  sub: Subscription;
  basket$: Observable<IBasket>;

  constructor(
    public sideNavService: SideNavService,
    public busyService: BusyService,
    private basketService: BasketService,
    private accountService: AccountService
  ) {  }

  ngOnInit(): void {
    this.sub = this.busyService.sharedStatus.subscribe(status => this.status$ = status);
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  toggle() {
    this.visibility = !this.visibility;
  }

  logout() {
    this.accountService.logout();
  }

}
