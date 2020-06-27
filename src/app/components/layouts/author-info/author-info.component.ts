import { Component, OnInit, Input } from '@angular/core';
import { IArticle } from 'src/app/shared/models/articles/article';

@Component({
  selector: 'app-author-info',
  templateUrl: './author-info.component.html',
  styleUrls: ['./author-info.component.scss']
})
export class AuthorInfoComponent implements OnInit {

  
  @Input() article: IArticle;


  constructor() { }

  ngOnInit() {
  }

}
