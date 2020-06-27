import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

public stringSubject = new Subject<boolean>();

constructor() { }


  passValue(data) {
    //passing the data as the next observable
    this.stringSubject.next(data);
  }

}
