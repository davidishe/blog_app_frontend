import { Component, OnInit, Input } from '@angular/core';
import { IComment } from 'src/app/shared/models/articles/comment';
import { IUser, User } from 'src/app/shared/models/user/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IArticle } from 'src/app/shared/models/articles/article';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() comments: IComment[];
  @Input() article: IArticle;

  formComments: FormGroup;
  valueFromChild: boolean;


  currentUserId: string;
  constructor() { }

  ngOnInit(): void {
    this.currentUserId = JSON.parse(localStorage.getItem('app-blog-user-id'));
    this.createFormComments();
    console.log(this.article);
  }

  createFormComments() {
      this.formComments = new FormGroup({
      inputComments: new FormControl(null, [Validators.required])
    });
  }

  onEdit(text: string, commentId: number) {
    console.log();
  }

  isCommented(comment: IComment) {
    this.valueFromChild = false;
    comment.isCommented = true;
    // this.createFormComments();
  }

  //reading events emitted by app-child component
  readOutputValueEmitted(val, comment: IComment){
    this.valueFromChild = !val;
    // this.createFormComments();
    console.log(this.valueFromChild);
    comment.isCommented = false;
  }

}
