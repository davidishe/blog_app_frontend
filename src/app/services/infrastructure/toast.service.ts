import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {


  private message = new BehaviorSubject('');
  toastMessage = this.message.asObservable();

  private color = new BehaviorSubject('transparent');
  toastColorStatus = this.color.asObservable();

  private status = new BehaviorSubject(false);
  toastStatus = this.status.asObservable();

constructor() {}

  setToast(status: string, message: string) {

    if (status === 'warning') {
      this.color.next('#ff4081');
    }
    if (status === 'success') {
      this.color.next('black');
    }
    if (status === 'info') {
      this.color.next('#4630eb');
    }

    this.message.next(message);
    this.status.next(true);

    setTimeout(() => {
      console.log('toast is finished');
      this.status.next(false);
    }, 1900);
  }

}
