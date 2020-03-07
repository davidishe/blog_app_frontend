import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})

export class NavMenuComponent {


  visibility = true;
  username: string;

  constructor(
    public auth: AuthService,
    private snackBar: MatSnackBar
  ) {}

  toggle() {
    this.visibility = !this.visibility;
  }

  logedIn() {
    return this.auth.logedIn();
  }

  logout() {
    localStorage.removeItem('app-token');
    this.openSnackBar('🙃 до новой встречи');
    console.log('loged out');
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }

}
