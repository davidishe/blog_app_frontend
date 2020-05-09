import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/products/product';
import { ShopService } from 'src/app/services/products/shop.service';
import { error } from 'util';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from '../../basket/basket.service';
import { IBasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;
  productId: number;
  quantity: number;


  constructor(
    private shopeService: ShopService,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private basketService: BasketService
  ) {
      this.breadcrumbService.set('@productDetails', '');
      this.quantity = 1;
  }

  ngOnInit() {
    this.productId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.loadProduct();
  }

  loadProduct() {
    this.shopeService.GetProductById(this.productId).subscribe((response: IProduct) => {
      this.product = response;
      this.breadcrumbService.set('@productDetails', this.product.name);
    }, err => {
      console.log(err);
    });
  }

  addItemToBasket(product: any) {
    console.log(product);
    this.basketService.addItemToBasket(product, this.quantity);
  }

  removeItemFromBasket(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }

  incrementQuantity(item: IBasketItem) {
    this.quantity++;
  }

  decrementQuantity(item: IBasketItem) {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

}
