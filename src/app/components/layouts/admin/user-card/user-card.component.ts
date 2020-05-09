import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user/user';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})


export class UserCardComponent implements OnInit {

  user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params.id);
      this.getUser(params.id);
    });
  }

  getUser(id: number) {
    this.userService.GetUser(id).subscribe((user: User) => {
      this.user = user;
    },
    error => {
      console.log(error);
    });
  }



}
