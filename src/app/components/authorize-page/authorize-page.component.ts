import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { User } from 'src/app/model/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { error } from 'protractor';

@Component({
  selector: 'app-authorize-page',
  templateUrl: './authorize-page.component.html',
  styleUrls: ['./authorize-page.component.scss']
})


export class AuthorizePageComponent implements OnInit {


  user: User;
  formAuthorize: FormGroup;
  isActive: boolean;

constructor(
    public auth: AuthService,
    private snackBar: MatSnackBar
    ) {}

  ngOnInit() {
    this.formAuthorize = new FormGroup({
      inputLogin: new FormControl(null,
        [Validators.required,
        Validators.email]),
      inputPassword: new FormControl(null,
        [Validators.required,
        Validators.minLength(6)])
    });

    this.isActive = true;
  }

  register() {
    if (this.formAuthorize.invalid) {
      console.log(this.formAuthorize.controls.inputLogin.errors);
      return;
    } else {
      this.user = {
        username: this.formAuthorize.controls.inputLogin.value,
        password: this.formAuthorize.controls.inputPassword.value
      };

      this.auth.authorize(JSON.stringify(this.user)).subscribe(() => {
        console.log('registration sucesful');
        this.auth.login(JSON.stringify(this.user)).subscribe();
        this.openSnackBar('🖖🏽 спасибо, что зашел!');

      }, error => {
        console.log(error);
        this.openSnackBar('🙁 что-то пошло не так');
      });

    }
  }

  openSnackBar(message: string) {
    // console.log(message);
    this.snackBar.open(message, '', {duration: 2500});
  }

  changePasswordType() {
    this.isActive = !this.isActive;
  }

}
