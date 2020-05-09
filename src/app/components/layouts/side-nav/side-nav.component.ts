import { Component, OnInit, AfterContentInit } from '@angular/core';
import { SideNavService } from 'src/app/services/side-nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements AfterContentInit {


  constructor(
    public sideNavService: SideNavService
  ) { }

  ngAfterContentInit(): void {
    // this.sideNavService.toggle(true);
  }


}
