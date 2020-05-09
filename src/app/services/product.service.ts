import { Injectable, OnInit } from '@angular/core';
import { Order } from '../shared/models/order';
import { IProduct } from '../shared/models/products/product';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.apiUrl;
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     Authorization: 'Bearer ' + localStorage.getItem('app-token')
  //   })
  // };

  constructor(private http: HttpClient) {}



products: Array<IProduct> = [];


GetAllProducts() {
  return this.http.get<any>(this.baseUrl + 'products/all/?pageSize=10');
}


  // setActionOnProductCard ////////////////////////////////////////////////////////////////////////
setActionOnProductCard_(openOrder: Order) {
    // console.log(openOrder);
    if (openOrder !== undefined) {
          // tslint:disable-next-line: prefer-for-of
          for (let index = 0; index < openOrder.productsDto.length; index++) {
            const productInOrder = openOrder.productsDto[index];

            for (let key = 0; index < this.products.length; key++) {
              const product = openOrder.productsDto[index];

              console.log(product);
              if (this.products) {
                if (productInOrder.guId === product.guId) {
                  this.products[key].productIsSelected = true;
                }
              }

            }

          }

    }

  }

}
