import { Component, OnInit, OnDestroy } from '@angular/core';
import { SideNavService } from 'src/app/services/side-nav.service';
import { IProduct } from 'src/app/shared/models/products/product';
import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/services/order.service';
import { ProductDto } from 'src/productdto';
import { LandingService } from 'src/app/services/landing.service';
import { ProductService } from 'src/app/services/product.service';
import { IPagination } from 'src/app/shared/models/pagination';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, OnDestroy {

  items: Array<any> = [];
  productsInCart: ProductDto[] = [];
  tempCart: Array<ProductDto> = [];
  today: Date = new Date();
  orders: Array<Order> = [];
  userId = +localStorage.getItem('userId');  isOpenedOrders: boolean;
  width: 900;
  isSelected: boolean;
  selectedProducts: any = [];
  products: IProduct[];
  subscribe: Subscription;



  constructor(
    private sideNavService: SideNavService,
    public orderService: OrderService,
    private landingService: LandingService,
    public productService: ProductService
  ) {

  }



  ngOnInit() {
    // this.sideNavService.toggle();
    // this.getAllProducts();
    // this.getAllOrders();
    this.GetAllProducts();

    this.items = [
      { title: 'Растения для дома', path: 'flower5.png', enrolledDate: this.today},
      { title: 'Кашпо', path: 'flower2.png', enrolledDate: this.today},
      { title: 'Коллекция фикусов', path: 'flower3.png', enrolledDate: this.today},
      { title: 'Цитрусовые растения', path: 'flower4.png', enrolledDate: this.today},
      { title: 'Растения для дома', path: 'flower3.png', enrolledDate: this.today},
      { title: 'Кашпо', path: 'flower5.png', enrolledDate: this.today},
      { title: 'Коллекция фикусов', path: 'flower4.png', enrolledDate: this.today},
      { title: 'Бонсай', path: 'flower2.png', enrolledDate: this.today}
    ];

  }

  GetAllProducts() {
    this.subscribe = this.productService.GetAllProducts().subscribe((response: IPagination) => {
      this.products = response.data;
    });
  }


  // get all orders ////////////////////////////////////////////////////////////////////////
  getAllOrders() {
    if (this.userId !== null) {
      this.subscribe = this.orderService.GetAllOrders().subscribe(response => {
        if (response) {
          this.orderService.getOpenedOrder(response);
          // this.productService.setActionOnProductCard(this.orderService.openOrder);
        }
      });
    }

    if (this.userId === null) {
      // console.log('functional in develop');
    }
  }

  //   productAddToCart  ////////////////////////////////////////////////////////////////////////
  productAddToCart(product: ProductDto) {

    product.productRegion = 'Азия';
    product.productType = 'Дерево';
    this.orderService.GetAllOrders().subscribe((response: any) => {

      if (this.orderService.isCartOpened() < 0 && this.userId !== null) {
        this.CreateNewOrderAndItem(product);
      }

      if (this.orderService.isCartOpened() >= 0 && this.userId !== null) {
        this.AddNewItemToExistingOrder(product, this.orderService.isCartOpened());
        this.getAllOrders();
      }

      if (this.userId === null) {
        this.getAllOrders();
        console.log('under construction');
      }

      product.productIsSelected = true;
      this.orderService.isEmpty = false;
    });
  }


  CreateNewOrderAndItem(product: any) {
    this.productsInCart.push(product);

    // this.productsInCart = [];
    this.orderService.CreateOrder(this.productsInCart, this.userId).subscribe((response: any) => {
      this.orderService.userOrders = response;
    },
    error => {
      // console.log(error);
    });
  }


  AddNewItemToExistingOrder(product: any, orderId: any) {
    // console.log('adding to existing cart');
    this.orderService.AddItemToOrder(product, orderId).subscribe((response: any) => {
      this.productsInCart = response;
      this.orderService.GetAllOrders().subscribe();
    },
    error => {
      console.log(error);
    });
  }


  //   productDeleteFromCart  ////////////////////////////////////////////////////////////////////////
  productDeleteFromCart(productDto: ProductDto, orderId: number) {

    if (this.userId !== null) {
      this.orderService.DeleteItemFromCartOnLanding(productDto.guId, this.orderService.openOrderId).subscribe(response => {
        // console.log(response);

        if (response) {
          this.orderService.userOrders = response as Order[];

          if (this.orderService.isCartOpened() < 0) {
            this.orderService.isEmpty = true;
            this.orderService.totalProductsInCart = null;
          }
        }

        this.orderService.CountTotalProducts();
      });
    }

  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }


}
