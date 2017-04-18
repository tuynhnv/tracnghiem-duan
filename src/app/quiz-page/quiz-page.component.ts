import { Component, OnInit } from '@angular/core';
import {AF} from "../../providers/af";
import {Timer} from "../../providers/time";
import {FirebaseListObservable} from "angularfire2";
import {Question} from '../model/question';
import {Grade} from  '../model/grade';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css'],
  
})
export class QuizPageComponent implements OnInit {

  public quizs: FirebaseListObservable<any>;
  public dethi: FirebaseListObservable<any>;
  public questions: FirebaseListObservable<any>;
  public timedethi: number;
  public correctCount: number;
  public lambaithied = false;
  public namequiz: string;
  public selectquiz = false;
  public result = false;
  public review = false;
  public mode: string;
  public pager = {
    index: 0,
    size: 1,
    count: 1
  };

  public questiones: Question[]=[];
  public grades: Grade[]=[];
  public grade: Grade=new Grade();

  constructor(public afService: AF, private timerService: Timer) {
      this.quizs=this.afService.quizs;
      this.namequiz="";
      this.mode = 'listquiz';
   }

  ngOnInit() {
  }
  
  lambaithi(){
    this.mode ='lambaithi';
    this.lambaithied =  true;
    this.questions =this.afService.getQuestion(this.namequiz);
    this.questions.subscribe(list => {
      var i=0;
       list.forEach(snapshot=> {
          this.questiones[i]=new Question(snapshot.name,snapshot.key, snapshot.A, snapshot.B, snapshot.C, snapshot.D);
          this.questiones[i].isAnswer=false;
          this.questiones[i].index=i;
          this.questiones[i].isAnswered="chưa trả lời";
          this.questiones[i].userAnswer="";
          console.log(this.questiones[i].name + i);
          console.log(this.questiones[i].D +"  " + i);
          i++;
       })
      });
    this.timerService.startTimer();
    console.log(this.lambaithied);
    this.pager.count = this.questiones.length;
    this.questiones.slice(this.pager.index, this.pager.index + this.pager.size);
    //console.log(this.quiz.time);
  }

  chondethi(){
     this.dethi=this.afService.chondethi(this.namequiz)
     this.dethi.subscribe(list => {
       list.forEach(snapshot=> {
          if(snapshot.name = this.namequiz) {
      //      this.quiz=new Quiz(snapshot);
        //    console.log(this.quiz.time);
            this.timerService.initTimer((snapshot.time) * 60);
            //console.log(snapshot.time);
          }
       })
      });
     this.selectquiz = true;
     this.lambaithied = false;
     this.result =false;
     this.mode='quiz';
     //this.namequiz="";
     
    //  console.log(this.timerService.displayTime);
     // console.log(this.timedethi);
  }

  // onSelect(i: number, userAnswer: string){
  //     this.userAnswer[i]=userAnswer;
  //     console.log(this.userAnswer[i]+ "   " + i);
    
  // }

  nopbai() {
    this.correctCount=0;
    var i=0;
    this.questiones.forEach(q=>{
      if(q.userAnswer==q.key){
        this.correctCount++;
      }
      console.log(this.questiones[i].isAnswer);
      i++;
    })
    console.log(this.correctCount);
    this.tinhdiem();
    this.mode = 'result';
    this.selectquiz=false;
    this.lambaithied=false;
    this.afService.sendGrade(this.grade.mark, this.grade.dethi);
  }

  tinhdiem(){
    this.grade=new Grade();
    this.grade.mark=(this.correctCount/this.questiones.length)* 10;
    this.grade.dethi=this.namequiz;
    console.log(this.grade.mark);
  }

  xemlai(){
    this.mode='review';
    this.lambaithied=false;
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'lambaithi';
    }
  }

  isCorrect(question: Question) {
    var isCorrect;
     (question.userAnswer==question.key) ? isCorrect='Câu trả lời đúng' : isCorrect='Câu trả lời sai'  ;
     (question.userAnswer=="") ? isCorrect='Bạn chưa trả lời':'';
     return isCorrect;
  }
}
  