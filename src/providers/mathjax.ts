// import {Directive, ElementRef, Input} from '@angular/core';
// @Directive({
//     selector: '[MathJax]'
// })
// export class MathJaxDirective {
//     @Input('MathJax') fractionString: string;

//     constructor(private el: ElementRef) {
//     }
    
//     ngOnChanges() {
//       console.log('>> ngOnChanges');
//        this.el.nativeElement.style.backgroundColor = 'yellow';
//        this.el.nativeElement.innerHTML = this.fractionString;
//        //MathJax.Hub.Queue(["Typeset",MathJax.Hub, this.el.nativeElement]);
//     }
// }

import {Directive, ElementRef, OnChanges, Input} from "@angular/core";
declare var MathJax: {
  Hub: {
    Queue: (param: Object[]) => void;
  }
}
@Directive({selector: '[MathJax]'})
export class MathJaxDirective implements OnChanges {
  @Input("MathJax") private value: string = "";
  constructor(private element: ElementRef) {}
  ngOnChanges() {
    this.element.nativeElement.innerHTML = this.value;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.element.nativeElement]);
  }
}