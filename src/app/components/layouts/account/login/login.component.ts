import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, IUser } from 'src/app/shared/models/user/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { DisplayService } from 'src/app/services/display.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    public displayService: DisplayService
    ) {}

  user: IUser;
  formLogin: FormGroup;
  isActive: boolean;
  returnUrl: string;


  ngOnInit() {
    this.formLogin = new FormGroup({
      inputEmailLogin: new FormControl(null,
        [Validators.required,
        Validators.email]),
      inputPassword: new FormControl(null,
        [Validators.required,
        Validators.minLength(6)])
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
    this.isActive = true;
  }

  fnSubmit() {
    if (this.formLogin.invalid) {
      console.log(this.formLogin.controls.inputEmailLogin.errors);
      return;
    } else {
      this.user = {
        email: this.formLogin.controls.inputEmailLogin.value,
        password: this.formLogin.controls.inputPassword.value
      };

      this.accountService.login(this.user).subscribe(() => {
        this.openSnackBar('и снова привет!');
        this.router.navigateByUrl(this.returnUrl);
      }, err => {
        console.log(err);
        this.openSnackBar('что-то пошло не так!');
      });

    }
  }

  openSnackBar(message: string) {
    console.log(message);
  }

  changePasswordType() {
    this.isActive = !this.isActive;
  }
}
