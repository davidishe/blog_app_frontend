import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { AccountService } from './components/layouts/account/account.service';
import { BusyService } from './services/infrastructure/busy.service';
import { IArticle } from './shared/models/articles/article';
import { ArticleService } from './services/articles/article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked {
  title = 'Цветкофф';
  jwtHelper = new JwtHelperService();

  footerVisible: boolean;

  status$: string = 'notloading';
  sub: Subscription;


  constructor(
    public busyService: BusyService,
    private ref: ChangeDetectorRef,
    private accountService: AccountService,
    private articleService: ArticleService
  ) {

  }
  ngAfterViewChecked(): void {
    this.ref.markForCheck();
    this.ref.detectChanges();
  }


  ngOnInit(): void {

    this.sub = this.busyService.sharedStatus.subscribe(status => this.status$ = status);
    this.loadCurrentUser();
    // this.loadAllArticles();
  }

  loadAllArticles() {
    this.articleService.GetAll().subscribe((response) => {
      // console.log(response);
    });
  }


  loadCurrentUser() {
    const token = localStorage.getItem('app-blog-token');
    if (token) {
      this.accountService.loadCurrentUser().subscribe(() => {
      }, err => {
        console.log(err);
      });
    }
  }

  ngOnDestroy(): void {
  }


}
