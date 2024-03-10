import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.css']
})
export class ThemeSwitcherComponent  {
  isDarkThemeActive = false;
 
  constructor(@Inject(DOCUMENT) private document: Document) { }
 
  onChange(newValue : boolean):void{
    if(newValue){
      this.document.body.classList.add('dark-mode');
    this.document.body.classList.remove('light-mode');
    }else{
      this.document.body.classList.add('light-mode');
    this.document.body.classList.remove('dark-mode');
    }
  }

}
