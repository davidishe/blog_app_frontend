import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  users: User[];
  displayedColumns: string[] = ['userId', 'username', 'name', 'city', 'phoneNumber'];
  dataSource: any;

  // MatPaginator Inputs
  length: any;
  pageSize = 10;
  pageSizeOptions: number[];
  pageIndex = 0;


  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {

    this.LoadUsers(this.pageIndex, this.pageSize);
    this.paginator.pageSizeOptions = this.pageSizeOptions;
    this.paginator.length = this.length;
    this.paginator.pageSize = this.pageSize;

    // page index actions in paginator
    this.paginator.page.subscribe(response => {
      this.LoadUsers(response.pageIndex + 1, response.pageSize);
    });
  }


  LoadUsers(pageNumber: number, pageSize: number) {
    this.userService.GetUsers(pageNumber, pageSize).subscribe(

      (response) => {
        if (response) {
          console.log(response);
          this.users = response.usersToReturn;
          this.dataSource = this.users;
          this.paginator.length = response.totalCount;
          this.pageSizeOptions = [5, 10, 25, response.totalCount];
        }
    },

    error => {
      console.log(error);
    });
  }


  showUser(userId: number) {
    this.router.navigate(['/user', userId]);
  }

}
