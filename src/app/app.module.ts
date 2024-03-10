import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { PomodoroComponent } from './home/pomodoro/pomodoro.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';

import { SettingsComponent } from './home/settings/settings.component';


import { MaterialModule  } from './modules/material/material.module';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        PomodoroComponent,
        SettingsComponent,
        ThemeSwitcherComponent,
    ],
    providers: [],
        
    
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        
        MaterialModule
        
    ]
})
export class AppModule { }
