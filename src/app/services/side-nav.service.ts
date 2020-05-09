import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

public opened?: boolean = true;


constructor() { }

toggle() {
  this.opened = !this.opened;
}

}
