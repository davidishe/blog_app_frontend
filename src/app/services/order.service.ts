import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IProduct } from '../shared/models/products/product';
import { ProductDto } from '../../productdto';


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

  isEmpty: boolean;
  totalProductsInCart: number;
  openOrderId: number;
  userId = localStorage.getItem('userId');
  selectedProducts: ProductDto[];


  constructor(
    private http: HttpClient,
    )
  {}




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




}
