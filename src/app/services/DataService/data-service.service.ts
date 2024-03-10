import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { valuesSettings } from './ValuesConfig';
 
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSubject: BehaviorSubject<valuesSettings> =
    new BehaviorSubject<valuesSettings>({
      timePomodoro: 25,
      timeBreak: 5,
      timeLongBreak: 15,
      audio: '',
      audioBackground: '',
    });
  get minutesValue() {
    return this.dataSubject.asObservable();
  }
  set dataSubjectData(data: valuesSettings) {
    this.dataSubject.next(data);
  }

}
