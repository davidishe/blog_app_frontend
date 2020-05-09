import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user/user';
import { PaginatedResult } from '../shared/models/pagination';
import { map } from 'rxjs/operators';



const httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('app-token'),
      'Access-Control-Expose-Headers': '*'
    })
  };

@Injectable({
  providedIn: 'root'
})


export class UserService {

  baseUrl = environment.apiUrl;
  headers: HttpHeaders;


  constructor(
    private http: HttpClient) { }

  GetUsers(page?, itemsPerPage?) {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.set('pageNumber', page);
      params = params.set('pageSize', itemsPerPage);
    }

    return this.http.get<any>(this.baseUrl + 'users',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('app-token')
        }),
        params,
        observe: 'response'
      })

      .pipe(
        map(response => {
        console.log(response);
        return response.body;
      }),
    );
  }

  GetUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id, httpOptions);
  }

}
