import { Component, OnInit } from '@angular/core';
import {AF} from "../../providers/af";
import {FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  public users: FirebaseListObservable<any>;

  constructor(public afService: AF) { 
    this.users = this.afService.users;
  }

  ngOnInit() {
  }

}
