import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasketTotals } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.scss']
})
export class OrderTotalComponent implements OnInit {
  basketTotals$: Observable<IBasketTotals>;
  @Input() isReview: boolean;

  constructor(
  ) { }

  ngOnInit() {
  }

}
