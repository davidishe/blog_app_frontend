import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Супер-ссылки';
  jwtHelper = new JwtHelperService();
  display: string = null;

  constructor(
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('app-token');
    if (token) {
      this.auth.decodedToken = this.jwtHelper.decodeToken(token);
    }

  }


}
