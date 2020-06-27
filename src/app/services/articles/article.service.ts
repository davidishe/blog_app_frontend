import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserParams } from 'src/app/shared/models/userParams';
import { Pagination, IPagination } from 'src/app/shared/models/pagination';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { IArticle } from 'src/app/shared/models/articles/article';
import { of } from 'rxjs';
import { IComment } from 'src/app/shared/models/articles/comment';

@Injectable({ providedIn: 'root' })

export class ArticleService {

  baseUrl = environment.apiUrl;
  articles: IArticle[] = [];
  pagination = new Pagination();
  userParams = new UserParams();

  constructor(private http: HttpClient) {}

  GetAll(useCache?: boolean) {

    if (useCache === false) {
      this.articles = [];
    }

    if (this.articles.length > 0 && useCache === true) {
      const pageReceived = Math.ceil(this.articles.length / this.userParams.pageSize);
      this.getUserParams();

      if (this.userParams.pageNumber < pageReceived) {

        if (this.userParams.pageNumber === 0) {
          this.pagination.data =
            this.articles.slice(this.userParams.pageNumber, this.userParams.pageSize);
        } else {
          this.pagination.data =
            this.articles.slice((this.userParams.pageNumber * this.userParams.pageSize),
              (this.userParams.pageNumber * this.userParams.pageSize) + this.userParams.pageSize);
        }

        return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.userParams.regionIdSelected !== 0) {
      params = params.append('regionId', this.userParams.regionIdSelected.toString());
    }
    if (this.userParams.typeIdSelected !== 0) {
      params = params.append('typeId', this.userParams.typeIdSelected.toString());
    }
    if (this.userParams.search) {
      params = params.append('search', this.userParams.search);
    }

    params = params.append('sort', this.userParams.sortSelected);
    params = params.append('pageIndex', (this.userParams.pageNumber).toString());
    params = params.append('pageSize', this.userParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'articles/all/', {observe: 'response', params})
      .pipe(
        map(response => {
          this.articles = [...this.articles, ...response.body.data];
          this.pagination = response.body;
          return this.pagination;
        })
      );
  }

  getCurrentArticle(id: number) {
    return this.http.get(this.baseUrl + 'articles/article?id=' + id);
  }

  getUserParams() {
    return this.userParams;
  }

  createComment(comment: IComment) {
    return this.http.post(this.baseUrl + 'comments/post', comment);
  }
}
