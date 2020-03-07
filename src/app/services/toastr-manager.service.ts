import { Injectable } from '@angular/core';

@Injectable()
export class ToastrManager {
  messages: string[] = [];


successToastr (message: string, title: string) {
  console.log(message, title);
}


errorToastr (message: string, title: string) {
  console.log(message, title);
}





}

