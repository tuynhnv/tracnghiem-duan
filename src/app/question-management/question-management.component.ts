import { Component, OnInit } from '@angular/core';
import {AF} from "../../providers/af";
import {FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.css']
})
export class QuestionManagementComponent implements OnInit {

  public quizs: FirebaseListObservable<any>;
  public questions: FirebaseListObservable<any>;
  public namequiz: string;
  public mode: string

  constructor(public afService: AF) {
    this.quizs = this.afService.quizs;
    this.mode = "listquiz";
    this.namequiz="";
  }

  ngOnInit() {
  }

  listquestion(){
    this.questions =this.afService.getQuestion(this.namequiz);
    this.mode = "listquestion";
  }

}
