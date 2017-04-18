import {Component, Input} from '@angular/core';
import {Injectable} from "@angular/core";
//import {ITimer} from "./itimer";
//import {Timer} from './itimer';



@Injectable()
export class Timer{

    //@Input() timeInSeconds: number;
    //public timer: ITimer;
    public seconds: number;
    public secondsRemaining: number;
    public runTimer: boolean;
    public hasStarted: boolean;
    public hasFinished: boolean;
    public displayTime: string;

    constructor() {
    }

    ngOnInit() {}

    initTimer(timeInSeconds: number) {
        //if(!timeInSeconds) { this.timeInSeconds = 0; }

        
            this.seconds = timeInSeconds;
            this.runTimer = false;
            this.hasStarted = false;
            this.hasFinished = false;
            this.secondsRemaining = timeInSeconds;


        this.displayTime = this.getSecondsAsDigitalClock(this.secondsRemaining);
    }

    startTimer() {
        this.hasStarted = true;
        this.runTimer = true;
        this.timerTick();
    }

     timerTick() {
        setTimeout(() => {
            if (!this.runTimer) { return; }
            this.secondsRemaining--;
            this.displayTime = this.getSecondsAsDigitalClock(this.secondsRemaining);
            if (this.secondsRemaining > 0) {
                this.timerTick();
            }
            else {
                this.hasFinished = true;
            }
        }, 1000);
    }

    getSecondsAsDigitalClock(inputSeconds: number) {
        var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        var hoursString = '';
        var minutesString = '';
        var secondsString = '';
        hoursString = (hours < 10) ? "0" + hours : hours.toString();
        minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
        secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
        return hoursString + ':' + minutesString + ':' + secondsString;
    }

    pauseTimer() {
        this.runTimer = false;
    }

    resumeTimer() {
        this.startTimer();
    }
    
}

