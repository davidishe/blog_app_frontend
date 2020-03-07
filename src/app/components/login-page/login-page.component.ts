import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { User } from 'src/app/model/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { error } from 'util';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
    ) {
  }

  user: User;
  formLogin: FormGroup;
  isActive: boolean;

  ngOnInit() {
    this.formLogin = new FormGroup({
      inputLogin: new FormControl(null,
        [Validators.required,
        Validators.email]),
      inputPassword: new FormControl(null,
        [Validators.required,
        Validators.minLength(6)])
    });

    this.isActive = true;
  }
  fnSubmit() {
    if (this.formLogin.invalid) {
      console.log(this.formLogin.controls.inputLogin.errors);
      return;
    } else {
      this.user = {
        username: this.formLogin.controls.inputLogin.value,
        password: this.formLogin.controls.inputPassword.value
      };

      this.auth.login(JSON.stringify(this.user)).subscribe(() => {
        this.openSnackBar('🤗 и снова привет!');

      }, error => {
        console.log(error);
      });
      this.openSnackBar('🙁 что-то пошло не так!');

    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }

  changePasswordType() {
    this.isActive = !this.isActive;
  }

}
