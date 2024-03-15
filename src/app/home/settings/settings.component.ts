import { Component,OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import { valuesSettings } from 'src/app/services/DataService/ValuesConfig';
import { DataService } from 'src/app/services/DataService/data-service.service';



@Component({
  selector: 'app-modal',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
 
export class SettingsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SettingsComponent>,
    public formcontrol : FormBuilder,
    public _dataService: DataService
    ){}
    
    $values:valuesSettings = {
      timePomodoro:25,
      timeBreak:5,
      timeLongBreak:15,
      audio: '',
      audioBackground:'', 
    }
    

  
  selectedSound : string  = '';
  alarmAudio: string = '';
  selectedBackgroundSound : string = '';
  audioBackground : string = '';
  
  text = 'Play';
  playSound :boolean = false;
  playBackground:boolean = false;

  ngOnInit() {
    this._dataService.updatedValues.subscribe(data => {
      this.$values = data
    });
    this.inputform.get('minutesControl')?.setValue(this.$values.timePomodoro);
    this.inputform.get('minutesControlBreak')?.setValue(this.$values.timeBreak);
    this.inputform.get('minutesControlLongBreak')?.setValue(this.$values.timeLongBreak);
}
  
  inputform = this.formcontrol.group({

    minutesControl:[this.$values.timePomodoro,[Validators.min(0),Validators.max(60)]],
    minutesControlBreak: [this.$values.timeBreak,[Validators.min(0),Validators.min(0)]],
    minutesControlLongBreak: [this.$values.timeLongBreak,[Validators.min(0),Validators.max(60)]]
  })
  
  get minutesControl(){
    return this.inputform.controls.minutesControl;
  }
  get minutesControlBreak(){
    return this.inputform.controls.minutesControlBreak;
  }
  get minutesControlLongBreak(){
    return this.inputform.controls.minutesControlLongBreak;
  }
  
  audio: HTMLAudioElement | null = null;
  toggleAudio() {
    if (this.alarmAudio) {
      if (!this.audio) {
        this.audio = new Audio(this.alarmAudio);
        this.audio.onended = () => {
          this.text = 'Play';
        };
      }
  
    if (this.audio.paused) {
      this.audio.play();
      this.text = 'Pause';
    } else {
      this.audio.pause();
      this.text = 'Play';
    }
  }

}

toggleaudioBackground: HTMLAudioElement | null = null;
toggleAudioBackground() {
  if (this.audioBackground) {
    if (!this.toggleaudioBackground) {
      this.toggleaudioBackground = new Audio(this.audioBackground);
      this.toggleaudioBackground.onended = () => {
        this.text = 'Play';
      };
    }
  if (this.toggleaudioBackground.paused) {
    this.toggleaudioBackground.play();
    this.text = 'Pause';
  } else {
    this.toggleaudioBackground.pause();
    this.text = 'Play';
  }
}
}  

  previewAudio() {
    this.playSound = true;

    if (this.selectedSound === '1') {
      this.alarmAudio = 'assets/audio/Alarm_Clock.mp3';
    } else if (this.selectedSound === '2') {
      //The other audios
    } else if (this.selectedSound === '3') {
      //The other audios
    } else {
    this.alarmAudio = '';
    this.playSound = false;
    }
  }

  previewBackgroundAudio(){
    this.playSound= false;
    this.playBackground = true;
    if(this.selectedBackgroundSound === 'none'){
      this.audioBackground = '';
      this.playBackground = false;
    }
    if (this.selectedBackgroundSound === '1') {
      this.audioBackground = 'assets/audio/Birds_Sound.mp3';
    } else if (this.selectedBackgroundSound === '2') {
      //The other audios
    } else if (this.selectedBackgroundSound === '3') {
     //The other audios
    } 
  }

  cancel() {
    this.dialogRef.close();
  };

  confirmChange(){
    this.setValues();
    this._dataService.dataSubjectData = this.$values;
    this.dialogRef.close();
  }


setValues(){
  this.$values.timePomodoro = this.minutesControl.value ?? 0;
  this.$values.timeBreak = this.minutesControlBreak.value ?? 0;
  this.$values.timeLongBreak= this.minutesControlLongBreak.value?? 0;
  this.$values.audio = this.alarmAudio;
  this.$values.audioBackground = this.audioBackground;
  this.audio?.pause();
  this.toggleaudioBackground?.pause();
}

}
