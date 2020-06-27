import { Component, OnInit } from '@angular/core';
import { IArticle } from 'src/app/shared/models/articles/article';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ArticleService } from 'src/app/services/articles/article.service';
import { IComment } from 'src/app/shared/models/articles/comment';

@Component({
  selector: 'app-fintech',
  templateUrl: './fintech.component.html',
  styleUrls: ['./fintech.component.scss']
})
export class FintechComponent implements OnInit {

  // btnVisible: boolean;
  article: IArticle;
  formComments: FormGroup;
  // newComment: IComment = {
  //   commentText: '',
  // };

  constructor(
    private articleService: ArticleService
  ) {  }

  ngOnInit() {
    this.createFormComments();
    this.getCurrentArticle(1);
  }

  getCurrentArticle(id: number) {
    this.articleService.getCurrentArticle(id).subscribe((response: any) => {
      this.article = response;
      console.log(this.article.comments);

    });
  }

  createFormComments() {
      this.formComments = new FormGroup({
      inputComments: new FormControl(null, [Validators.required])
    });
  }

  // onComment() {
  //   this.newComment.commentText = this.formComments.get('inputComments').value;
  //   console.log(this.article.id);
  //   this.newComment.articleId = this.article.id;
  //   this.article.comments.push(this.newComment);

  //   this.articleService.createComment(this.newComment).subscribe((response) => {
  //     console.log(response);
  //     if (response) {
  //       this.formComments.get('inputComments').reset();
  //     }
  //   });

  // }

  // resizeCommentHeight() {
  //   this.expandTextarea('inputComments');
  // }

  // expandTextarea(id) {
  //   document.getElementById(id).addEventListener('keyup', function() {
  //       this.style.overflow = 'hidden';
  //       this.style.height = this.scrollHeight + 'px';
  //   }, false);
  // }



}
