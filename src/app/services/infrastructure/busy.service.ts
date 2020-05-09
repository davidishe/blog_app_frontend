import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  private status = new BehaviorSubject(false);
  sharedStatus = this.status.asObservable();

  constructor() {
  }


  isLoading(status: boolean) {
    this.status.next(status);
  }

}
