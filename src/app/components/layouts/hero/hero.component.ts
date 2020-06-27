import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from 'src/app/shared/models/products/product';
import { ShopService } from 'src/app/services/products/shop.service';
import { UserParams } from 'src/app/shared/models/userParams';
import { BusyService } from 'src/app/services/infrastructure/busy.service';
import { ToastService } from 'src/app/services/infrastructure/toast.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  today: Date = new Date();
  userId = +localStorage.getItem('userId');

  constructor(
    public busyService: BusyService,
    public toastService: ToastService,
  ) {  }


  setToast() {
    this.toastService.setToast('warning', 'bye-bye');
  }


  ngOnInit() {
  }




}
