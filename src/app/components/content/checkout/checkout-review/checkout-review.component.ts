import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/app/shared/models/products/product';
import { IBasket, IBasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
  @Input() basketItems: IBasketItem[];


  constructor() { }

  ngOnInit() {
  }

}
