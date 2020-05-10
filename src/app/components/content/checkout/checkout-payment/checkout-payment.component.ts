import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { BasketService } from '../../basket/basket.service';
import { MatSnackBar } from '@angular/material';
import { IBasket } from 'src/app/shared/models/basket';
import { IOrder } from 'src/app/shared/models/orders/order';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutFormGroup: FormGroup;

  constructor(
    private checkoutService: CheckoutService,
    private basketService: BasketService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
  }

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe((order: IOrder) => {
      this.openSnackBar('Заказ подтвержден');
      this.basketService.deleteLocalBasket(basket.id);
      console.log(order);
      const navigationExtras: NavigationExtras = {state: order};
      this.router.navigate(['checkout/success'], navigationExtras);
    }, error => {
      this.openSnackBar('Произошла ошибка');
      console.log(error);
    });
  }

  private getOrderToCreate(basket: IBasket) {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutFormGroup.get('deliveryForm').get('deliveryMethod').value,
      shipToAddress: this.checkoutFormGroup.get('addressForm').value
    };
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }

}
