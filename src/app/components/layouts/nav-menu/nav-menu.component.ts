import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { IBasket } from 'src/app/shared/models/basket';
import { AccountService } from '../account/account.service';
import { IUser } from 'src/app/shared/models/user/user';
import { BusyService } from 'src/app/services/infrastructure/busy.service';
import { ToastService } from 'src/app/services/infrastructure/toast.service';
import { transition, trigger, useAnimation } from '@angular/animations';
import { bounceOutUp, bounce, bounceOutRight, bounceOutLeft, slideOutUp, slideOutDown } from 'ng-animate';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  animations: [
    trigger('bounce', [
      transition('* => void', useAnimation(slideOutUp, {params: { timing: 0.3, delay: 0 }})),
    ]
    )
  ],
})

export class NavMenuComponent implements OnInit, OnDestroy {


  currentUser$: Observable<IUser>;

  toastVisibility = true;
  username: string;

  color$: string;
  toastColorStatus: Subscription;

  toastStatus: Subscription;
  toastVisibility$: boolean;

  message$: string;
  toastMessage: Subscription;

  status$: string;
  sub: Subscription;

  isMenuOpen: boolean;




  basket$: Observable<IBasket>;

  constructor(
    private accountService: AccountService,
    private toastService: ToastService,
    private busyService: BusyService
  ) {  }

  ngOnInit(): void {
    this.toastColorStatus = this.toastService.toastColorStatus.subscribe(color => this.color$ = color);
    this.toastStatus = this.toastService.toastStatus.subscribe(toastVisibility => this.toastVisibility$ = toastVisibility);
    this.toastMessage = this.toastService.toastMessage.subscribe(toastMessage => this.message$ = toastMessage);
    this.sub = this.busyService.sharedStatus.subscribe(status => this.status$ = status);

    this.currentUser$ = this.accountService.currentUser$;

    this.isMenuOpen = false;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.toastColorStatus.unsubscribe();
    this.toastStatus.unsubscribe();
    this.toastMessage.unsubscribe();
  }

  onMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  toggle() {
    this.toastVisibility = !this.toastVisibility;
  }

  logout() {
    this.accountService.logout();
  }

}
