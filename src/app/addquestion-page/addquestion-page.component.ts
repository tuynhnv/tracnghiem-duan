import { Component, OnInit } from '@angular/core';
import {FirebaseListObservable} from "angularfire2";
import {AF} from "../../providers/af";
import {CKEditorModule} from 'ng2-ckeditor';
//import CKEDITOR from 'CKEDITOR/PATH';
import {MathJaxDirective} from "../../providers/mathjax";


@Component({
  selector: 'app-addquestion-page',
  templateUrl: './addquestion-page.component.html',
  styleUrls: ['./addquestion-page.component.css'],
  
  providers: [MathJaxDirective]

})
export class AddquestionPageComponent implements OnInit {

  public quizs: FirebaseListObservable<any>;
  public alert= false;
  public content: string;
  public equationTexString: string = "$\frac 12$";
  

  constructor(public afService: AF) {
      this.quizs=this.afService.quizs;
      this.content = '<p>Hello <strong>World !</strong></p>'
   }

  ngOnInit() {
    // CKEDITOR.replace( 'editor1', {
		// 	extraPlugins: 'mathjax',
		// 	mathJaxLib: 'http://cdn.mathjax.org/mathjax/2.6-latest/MathJax.js?config=TeX-AMS_HTML',
		// 	height: 320
		// } );

		// if ( CKEDITOR.env.ie && CKEDITOR.env.version == 8 ) {
		// 	document.getElementById( 'ie8-warning' ).className = 'tip alert';
		// }
    //MathJax.Hub.Queue(["Typeset",MathJax.Hub,"MathJax"]);
  }


  addquestion(event, dethi, name, A, B, C, D, key){
    event.preventDefault();
    this.afService.addquestion(dethi, name, A, B, C, D, key);
    this.alert = true;
  }

  reset(){
    this.alert= false;
  }
}
