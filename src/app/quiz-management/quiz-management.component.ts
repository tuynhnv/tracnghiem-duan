import { Component, OnInit } from '@angular/core';
import {AF} from "../../providers/af";
import {FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-quiz-management',
  templateUrl: './quiz-management.component.html',
  styleUrls: ['./quiz-management.component.css']
})
export class QuizManagementComponent implements OnInit {

  public quizs: FirebaseListObservable<any>;

  constructor(public afService: AF) {
    this.quizs = this.afService.quizs;
  }

  ngOnInit() {
  }

}
