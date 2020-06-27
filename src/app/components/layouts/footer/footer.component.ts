import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements AfterContentInit {

  footerIsVisible: boolean = false;
  constructor() { }

  ngAfterContentInit(): void {
    this.footerIsVisible = true;
  }




}
