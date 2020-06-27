import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export class BusyService {

  private status = new BehaviorSubject('string');
  sharedStatus = this.status.asObservable();

  constructor() {
  }


  isLoading(status: string) {
    this.status.next(status);
  }

}
