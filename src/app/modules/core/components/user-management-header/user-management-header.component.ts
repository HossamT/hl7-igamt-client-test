import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management-header',
  templateUrl: './user-management-header.component.html',
  styleUrls: ['./user-management-header.component.scss'],
})
export class UserManagementHeaderComponent implements OnInit {

  // PULL R
  loggedIn: boolean;
  username: boolean;

  constructor() { }

  ngOnInit() {
  }

}
