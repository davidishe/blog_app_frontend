import { Component, OnInit, OnDestroy } from '@angular/core';
import { SideNavService } from 'src/app/services/side-nav.service';
import { IProduct } from 'src/app/shared/models/products/product';
import { OrderService } from 'src/app/services/order.service';
import { ProductDto } from 'src/productdto';
import { LandingService } from 'src/app/services/landing.service';
import { IPagination } from 'src/app/shared/models/pagination';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  items: Array<any> = [];
  productsInCart: ProductDto[] = [];
  tempCart: Array<ProductDto> = [];
  today: Date = new Date();
  userId = +localStorage.getItem('userId');  isOpenedOrders: boolean;
  width: 900;
  isSelected: boolean;
  selectedProducts: any = [];
  products: IProduct[];
  subscribe: Subscription;



  constructor(
    private sideNavService: SideNavService,
    public orderService: OrderService,
    private landingService: LandingService
  ) {

  }



  ngOnInit() {
  }



}
