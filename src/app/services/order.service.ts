import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Order } from '../shared/models/order';
import { map } from 'rxjs/operators';
import { IProduct } from '../shared/models/products/product';
import { ProductDto } from '../../productdto';
import { ProductService } from './product.service';


const httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('app-token')
    })
  };

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = environment.apiUrl;
  headers: HttpHeaders;
  userOrders: Array<Order> = [];

  isEmpty: boolean;
  totalProductsInCart: number;
  openOrderId: number;
  openOrder: Order;
  userId = localStorage.getItem('userId');
  selectedProducts: ProductDto[];


  constructor(
    private http: HttpClient,
    private productsService: ProductService) {}

  GetAllOrders(): any {
    return this.http.get<any>(this.baseUrl + 'orders/',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('app-token')
        }),
        observe: 'response'
      })
      .pipe(
        map(response => {
        if (this.userId !== null) {
          this.userOrders = response.body as Order[];
          this.CountTotalProducts();
          this.getOpenedOrder(this.userOrders);
          this.getOpenOrderId();
          return response.body;
        }

        if (this.isCartOpened() < 0) {
          this.isEmpty = true;
        }
      }),
    );
  }


  getOpenedOrder(orders: Order[]): Order {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < orders.length; index++) {
      const order = orders[index];
      this.openOrder = undefined;
      if (order.isOpened === true) {
        this.openOrder = order;
        this.productsService.setActionOnProductCard_(this.openOrder);
        return this.openOrder;
      }
    }
  }


  // OK
CountTotalProducts() {
    const array = this.userOrders.filter(order => order.isOpened === true);

    array.forEach(order => {

      if (array.length > 0) {
        this.totalProductsInCart = order.productsDto.length;
      }

      if (array.length === 0) {
        this.totalProductsInCart = 0;
      }
    });

  }


  // get some user orders
GetUserOrder(userId: number) {

    return this.http.get<any>(this.baseUrl + 'orders/user-order/?userId=' + userId,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('app-token')
        }),
        observe: 'response'
      })

      .pipe(
        map(response => {
        this.userOrders = response.body;
        return response.body;
      }),
    );
  }


CreateOrder(productsDto: ProductDto[], userId: number) {
    return this.http.post(this.baseUrl + 'orders/create-order/?userId=' + userId, productsDto);
  }

AddItemToOrder(products: IProduct[], orderId: number) {
    return this.http.post(this.baseUrl + 'orders/add-product-to-order/?orderId=' + orderId, products);
  }

DeleteOrder(orderId: any) {
    return this.http.delete(this.baseUrl + 'orders/delete-order/?orderId=' + orderId);
  }


DeleteItemFromCart(productId?: any, orderId?: any) {
    return this.http.post(this.baseUrl + 'orders/delete-item-in-order/?productId=' + productId + '&orderId=' + orderId, httpOptions);
  }

DeleteItemFromCartOnLanding(productGuId?: any, orderId?: any) {
    return this.http.post(this.baseUrl + 'orders/delete-item-in-order-landing/?guId=' + productGuId + '&orderId=' + orderId, httpOptions);
  }


isCartOpened(): any {
    // if (this.userOrders.length !== 0) {
      // tslint:disable-next-line: prefer-for-of
      console.log('fdsfsdfsfs!!!!3242424');
      console.log(this.userOrders);

      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.userOrders.length; index++) {

        const order = this.userOrders[index];
        if (order.isOpened === true) {
          return this.openOrderId;
        }
      }
      return -1;
    // }
    // return -1;
  }



isArchivedOrders(): number {
    if (this.userOrders) {
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.userOrders.length; index++) {

        const order = this.userOrders[index];
        if (order.isOpened === false) {
          return order.orderId;
        }
      }
    }
    return -1;
  }


  getOpenOrderId() {
      this.userOrders.forEach(order => {
          if (order.isOpened === true) {
            this.openOrderId = order.orderId;
            console.log(this.openOrderId);
          }
        });
      return this.openOrderId;
  }



}
