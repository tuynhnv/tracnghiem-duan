import { Component, OnInit } from '@angular/core';
import {AF} from "../../providers/af";
import {FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-grade-page',
  templateUrl: './grade-page.component.html',
  styleUrls: ['./grade-page.component.css']
})
export class GradePageComponent implements OnInit {
  
  public grades: FirebaseListObservable<any>;

  constructor(public afService: AF) {
    this.grades = this.afService.getGrade(this.afService.email);
  }

  ngOnInit() {
  }

}
