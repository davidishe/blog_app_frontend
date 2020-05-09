import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProductType } from 'src/app/shared/models/type';

@Injectable()

export class TypesService {

  baseUrl = environment.apiUrl;
  itemList: IProductType[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('app-token')
    })
  };

  constructor(private http: HttpClient) { }

  GetAllTypes() {
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types', this.httpOptions);
  }

  Create(productType: IProductType) {
    return this.http.post(this.baseUrl + 'products/create-type', productType, this.httpOptions);
  }

  GetById(id: number) {
    return this.http.get(this.baseUrl + 'get-item/?id=' + id, this.httpOptions);
  }

  Update(productType: IProductType) {
    return this.http.post(this.baseUrl + 'update-item', productType, this.httpOptions);
  }

  Delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete-item/?id=' + id, this.httpOptions);
  }


}
