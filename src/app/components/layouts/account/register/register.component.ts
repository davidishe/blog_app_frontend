import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/models/user/user';
import { FormGroup, FormControl, Validators, AsyncValidatorFn } from '@angular/forms';
import { DisplayService } from 'src/app/services/display.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errors: string[];
  user: IUser;
  formRegister: FormGroup;
  isActive: boolean;

  constructor(
    public accountService: AccountService,
    public displayService: DisplayService
    ) {
  }



  ngOnInit() {
    this.createRegisterForm();
    this.isActive = true;
  }

  createRegisterForm() {
    this.formRegister = new FormGroup({
    inputDisplayName: new FormControl(null, [Validators.required]),
    inputEmailLogin: new FormControl(null,
      [Validators.required, Validators.email]),
    inputPassword: new FormControl(null,
      [Validators.required,
      Validators.minLength(6)])
    });
  }

  onSubmit() {
    if (this.formRegister.invalid) {
      console.log(this.formRegister.controls.inputEmailLogin.errors);
      return;
    } else {
      this.user = {
        displayName: this.formRegister.controls.inputDisplayName.value,
        email: this.formRegister.controls.inputEmailLogin.value,
        password: this.formRegister.controls.inputPassword.value,
      };

      this.accountService.register(this.user).subscribe(() => {
        this.openSnackBar('🤗 и снова привет!');
      }, error => {
        console.log(error);
        this.errors = error.errors;
        console.log(this.errors);
        this.openSnackBar('🙁 что-то пошло не так!');
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
