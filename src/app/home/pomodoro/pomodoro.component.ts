import { Component,OnDestroy, OnInit} from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { SettingsComponent } from '../settings/settings.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataService } from 'src/app/services/DataService/data-service.service';
import { valuesSettings } from 'src/app/services/DataService/ValuesConfig';


@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css'],



})
export class PomodoroComponent implements OnDestroy, OnInit {



  constructor(public modal: MatDialog,
    public _dataService: DataService
  ) {}

  running = false;
  value = [25, 0];
  subscription: Subscription | undefined;
  m: number = 0;
  s: number = 0;
  alarmSound: string = '';
  backgroundSound: string = '';
  selectedTimer: string = 'pomodoroTimer';
  startButtonVisible = true;
  stopResetButtonsVisible = false;
  settingsVisible = true;
  type!: string;

  audioBack: HTMLAudioElement | null = null;

  values$: valuesSettings = {
    timePomodoro: 25,
    timeBreak: 5,
    timeLongBreak: 15,
    audio: '',
    audioBackground: ''
  };



 
  ngOnInit(): void {
    if (this.m) {
      this.value[0] = this.m;
    } else {
      this.m = 25;
    }
    if (this.s) {
      this.value[1] = this.s;
    } else {
      this.s = 0;
    }

    this._dataService.updatedValues.subscribe( ({timePomodoro,timeBreak,timeLongBreak, audio, audioBackground }) =>{

      this.values$.timePomodoro= timePomodoro;
      this.values$.timeBreak = timeBreak;
      this.values$.timeLongBreak = timeLongBreak;
      this.alarmSound = audio;
      this.backgroundSound = audioBackground;

      this.chooseOption();
    });






  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  chooseOption() {

    if ('pomodoroTimer' == this.selectedTimer) {
      this.type = 'Pomodoro';
      this.value = [this.values$.timePomodoro, 0];
    }
    if ('breakTimer' == this.selectedTimer) {
      this.type = 'Short break';
      this.value = [this.values$.timeBreak, 0];
    }
    if ('longBreakTimer' == this.selectedTimer) {
      this.type = 'Long break';
      this.value = [this.values$.timeLongBreak, 0];
    }

  }

  startTimer(): void {
    this.startBackgroundSound(true);
    if (!this.running) {
      // Set running to true.

      this.running = true;
      // Check if the timer is comeplete and if so reset it before starting.
      if (this.value[0] === 0 && this.value[1] === 0) {
        this.resetTimer();
      }
      this.subscription = interval(1000).subscribe(x => this.updateTimer());
      this.stopResetButtonsVisible = true;
      this.startButtonVisible = false;

    }
  }

  stopTimer(): void {
    if (this.running) {
      // Set running to false.
      this.running = false;
      console.log('Stopping timer and background sound');
      this.startBackgroundSound(false);
      // If we want to stop the timer then unsubscribe from the interval.
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.startButtonVisible = true;
      this.stopResetButtonsVisible = false;
    }
  }

  resetTimer(): void {
    this.stopTimer();

    this.value = [this.m, this.s];

    this.startButtonVisible = true;
    this.stopResetButtonsVisible = false;
  }

  updateTimer(): void {
    if (this.running) {
      // Check if the timer is comeplete and if so stop the timer and run onComplete().
      if (this.value[0] === 0 && this.value[1] === 0) {
        //Play the alarm sound and pause the background sound
        this.startBackgroundSound(false);
        this.playAlarm();
        this.stopTimer();
      } else if (this.value[0] !== 0 && this.value[1] === 0) {
        this.value = [this.value[0] - 1, 59];
      } else if (this.value[1] !== 0) {
        this.value = [this.value[0], this.value[1] - 1];
      }
    }
  }
  playAlarm() {

    let audio = new Audio();
    audio.src = this.alarmSound;
    audio.load();
    audio.play();

  }


  openModal(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;


    this.modal.open(SettingsComponent);

  }

  pauseBackgroundSound() {


  }

  startBackgroundSound(startOrPause: boolean, volumeLevel: number = 0.5): void {
    if (this.backgroundSound !== '') {

      if (!this.audioBack) {
        this.audioBack = new Audio();
        this.audioBack.src = this.backgroundSound;
        this.audioBack.volume = volumeLevel;
        this.audioBack.loop = true;
        this.audioBack.load();
      }

      if (startOrPause) {
        this.audioBack.play();
      }
      else {
        console.log("pause")
        this.audioBack.pause();
      }

      this.audioBack.addEventListener('error', (errorEvent) => {
        console.error('Error loading audio:', errorEvent);
      });
    }
  }






}




