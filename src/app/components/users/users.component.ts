import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = []

  constructor(private us: UserService) { }

  ngOnInit() {
    this.us.getAllUsers().subscribe(users => this.users = users)
  }

}
