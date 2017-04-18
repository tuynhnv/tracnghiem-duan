import {Injectable} from '@angular/core';

@Injectable()
export class Question {
    name: string;
    key: string;
    A: string;
    B: string;
    C: string;
    D: string;
    userAnswer: string;
    isAnswer: false;
    isAnswered: string;
    index: number;
    constructor(name: string, key: string, A: string, B: string, C: string, D: string){    
        this.name=name;
        this.key=key;
        this.A=A;
        this.B=B;
        this.C=C;
        this.D=D;

    }
    setQuestion(name: string, key: string){    
        this.name=name;
        this.key=key;

    }
}