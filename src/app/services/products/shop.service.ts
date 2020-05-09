import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IProduct } from 'src/app/shared/models/products/product';
import { environment } from 'src/environments/environment';
import { IPagination } from 'src/app/shared/models/pagination';
import { map } from 'rxjs/operators';
import { ShopParams } from 'src/app/shared/models/shopParams';

@Injectable()

export class ShopService {

baseUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('app-token')
    })
  };

  constructor(private http: HttpClient) {}


  products: Array<IProduct> = [];


  GetAllProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    if (shopParams.regionIdSelected !== 0) {
      params = params.append('regionId', shopParams.regionIdSelected.toString());
    }
    if (shopParams.typeIdSelected !== 0) {
      params = params.append('typeId', shopParams.typeIdSelected.toString());
    }
    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('sort', shopParams.sortSelected);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());


    return this.http.get<IPagination>(this.baseUrl + 'products/all/', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  GetProductById(id: number) {
    return this.http.get(this.baseUrl + 'products/product/?id=' + id, this.httpOptions);
  }

}
