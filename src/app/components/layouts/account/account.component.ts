import { Component, OnInit, Output, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SideNavService } from 'src/app/services/side-nav.service';
import { User } from 'src/app/shared/models/user/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DisplayService } from 'src/app/services/display.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  tabIndex$: Observable<number>;

  constructor(
    public displayService: DisplayService
  ) {  }

  ngOnInit(): void {
    this.tabIndex$ = this.displayService.tabIndex$;
  }




}
