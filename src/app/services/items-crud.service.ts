import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemModel } from '../model/objects';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsCrudService {

  baseurl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  GetAll() {
    const reqHeader = new HttpHeaders();
    reqHeader.append('Content-Type', 'application/json');
    return this.http.get(this.baseurl + 'get-items/', { headers: reqHeader });
  }

  Create(item: ItemModel) {
    const reqHeader = new HttpHeaders();
    reqHeader.append('Content-Type', 'application/json');
    return this.http.post(this.baseurl + 'create-item', item, { headers: reqHeader });
  }

  GetById(id: number) {
    const reqHeader = new HttpHeaders();
    reqHeader.append('Content-Type', 'application/json');
    return this.http.get(this.baseurl + 'get-item/?id=' + id, { headers: reqHeader });
  }

  Update(item: ItemModel) {
    const reqHeader = new HttpHeaders();
    reqHeader.append('Content-Type', 'application/json');
    return this.http.post(this.baseurl + 'update-item', item, { headers: reqHeader });
  }

  Delete(id: number) {
    const reqHeader = new HttpHeaders();
    reqHeader.append('Content-Type', 'application/json');
    return this.http.delete(this.baseurl + 'delete-item/?id=' + id, { headers: reqHeader });
  }
}
