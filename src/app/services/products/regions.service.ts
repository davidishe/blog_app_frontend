import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IProductRegion } from 'src/app/shared/models/region';

@Injectable()

export class RegionsService {


  baseUrl = environment.apiUrl;
  itemList: IProductRegion[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('app-token')
    })
  };

  constructor(private http: HttpClient) { }

  GetAllRegions() {
    return this.http.get<any>(this.baseUrl + 'products/regions', this.httpOptions);
  }

  Create(productRegion: IProductRegion) {
    return this.http.post(this.baseUrl + 'products/create-region', productRegion, this.httpOptions);
  }

  GetById(id: number) {
    return this.http.get(this.baseUrl + 'get-item/?id=' + id, this.httpOptions);
  }

  Update(productRegion: IProductRegion) {
    return this.http.post(this.baseUrl + 'update-item', productRegion, this.httpOptions);
  }

  Delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete-item/?id=' + id, this.httpOptions);
  }

}
