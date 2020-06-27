import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IComment } from 'src/app/shared/models/articles/comment';
import { IArticle } from 'src/app/shared/models/articles/article';
import { ArticleService } from 'src/app/services/articles/article.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  @Output() myOutputVal = new EventEmitter();
  @Input() formComments: FormGroup;
  @Input() article: IArticle;
  @Input() parentId: number;

  btnVisible: boolean;
  newComment: IComment = {
    commentText: '',
  };

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.btnVisible = false;
  }

  onComment() {
    this.newComment.commentText = this.formComments.get('inputComments').value;
    this.newComment.articleId = this.article.id;
    this.newComment.parentId = this.parentId;

    this.articleService.createComment(this.newComment).subscribe((comment: IComment) => {
      const parentId = comment.parentId;

      if (parentId === null) {
        this.article.comments.push(comment);
        this.formComments.get('inputComments').reset();
      }
      if (parentId !== null) {
        console.log('addin sub');
        const commentForAdd = this.article.comments.find(x => x.id === parentId);
        // const commentForAdd = this.article.comments.find(x => x.id = comment.parentId);

        console.log(commentForAdd);
        commentForAdd.subComments.push(comment);
        // .subComments.push(comment);
        this.formComments.get('inputComments').reset();
      }
    });

  }

  onCancel() {
    this.formComments.get('inputComments').reset();
    this.btnVisible = !this.btnVisible;
    this.myOutputVal.emit(this.btnVisible);
  }

  resizeCommentHeight() {
    this.expandTextarea('inputComments');
  }

  expandTextarea(id) {
    document.getElementById(id).addEventListener('keyup', function() {
        this.style.overflow = 'hidden';
        this.style.height = this.scrollHeight + 'px';
    }, false);
  }

}
