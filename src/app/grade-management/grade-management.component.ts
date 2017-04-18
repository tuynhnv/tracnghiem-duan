import { Component, OnInit } from '@angular/core';
import {AF} from "../../providers/af";
import {FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-grade-management',
  templateUrl: './grade-management.component.html',
  styleUrls: ['./grade-management.component.css']
})
export class GradeManagementComponent implements OnInit {

  public grades: FirebaseListObservable<any>;

  constructor(public afService: AF) {
    this.grades = this.afService.grades;
  }


  ngOnInit() {
  }

}
