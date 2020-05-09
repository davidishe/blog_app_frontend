import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProduct } from '../shared/models/products/product';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('app-token')
    })
  };

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  GetAll() {
    return this.http.get<any>(this.baseUrl + 'landing/get-items/', httpOptions);
  }

  CreateProduct(product: IProduct) {
    return this.http.post(this.baseUrl + 'landing/create-item/', product, httpOptions);
  }

  DeleteProduct(productId: IProduct) {
    return this.http.delete(this.baseUrl + 'landing/delete-item/?productId=' + productId, httpOptions);
  }

}
