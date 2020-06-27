import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IProduct } from 'src/app/shared/models/products/product';
import { environment } from 'src/environments/environment';
import { IPagination, Pagination } from 'src/app/shared/models/pagination';
import { map } from 'rxjs/operators';
import { UserParams } from 'src/app/shared/models/userParams';
import { of } from 'rxjs';

@Injectable()

export class ShopService {

  baseUrl = environment.apiUrl;
  products: IProduct[] = [];
  pagination = new Pagination();
  UserParams = new UserParams();

  constructor(private http: HttpClient) {}

  // GetAllProducts(useCache?: boolean) {

  //   if (useCache === false) {
  //     this.products = [];
  //   }

  //   if (this.products.length > 0 && useCache === true) {
  //     const pageReceived = Math.ceil(this.products.length / this.UserParams.pageSize);
  //     this.getUserParams();

  //     if (this.UserParams.pageNumber < pageReceived) {

  //       if (this.UserParams.pageNumber === 0) {
  //         this.pagination.data =
  //           this.products.slice(this.UserParams.pageNumber, this.UserParams.pageSize);
  //       } else {
  //         this.pagination.data =
  //           this.products.slice((this.UserParams.pageNumber * this.UserParams.pageSize),
  //             (this.UserParams.pageNumber * this.UserParams.pageSize) + this.UserParams.pageSize);
  //       }

  //       return of(this.pagination);
  //     }
  //   }

  //   let params = new HttpParams();

  //   if (this.UserParams.regionIdSelected !== 0) {
  //     params = params.append('regionId', this.UserParams.regionIdSelected.toString());
  //   }
  //   if (this.UserParams.typeIdSelected !== 0) {
  //     params = params.append('typeId', this.UserParams.typeIdSelected.toString());
  //   }
  //   if (this.UserParams.search) {
  //     params = params.append('search', this.UserParams.search);
  //   }

  //   params = params.append('sort', this.UserParams.sortSelected);
  //   params = params.append('pageIndex', (this.UserParams.pageNumber).toString());
  //   params = params.append('pageSize', this.UserParams.pageSize.toString());

  //   return this.http.get<IPagination>(this.baseUrl + 'products/all/', {observe: 'response', params})
  //     .pipe(
  //       map(response => {
  //         this.products = [...this.products, ...response.body.data];
  //         this.pagination = response.body;
  //         return this.pagination;
  //       })
  //     );
  // }

  setUserParams(params: UserParams) {
    this.UserParams = params;
  }

  getUserParams() {
    return this.UserParams;
  }

  GetProductById(id: number) {
    const product = this.products.find(p => p.id === id);
    if (product) {
      return of(product);
    }
    return this.http.get(this.baseUrl + 'products/product/?id=' + id);
  }

  getProductByGuId(guId: number) {
    const product = this.products.find(p => p.guId === guId);
    if (product) {
      return of(product);
    }
    return this.http.get(this.baseUrl + 'products/getproductid/?guId=' + guId);
  }

}
