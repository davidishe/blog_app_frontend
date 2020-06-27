import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {

  subscribeForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.createSubscribeForm();
  }


  createSubscribeForm() {
    this.subscribeForm = new FormGroup({
    inputEmail: new FormControl(null, [Validators.required])});
  }

}
