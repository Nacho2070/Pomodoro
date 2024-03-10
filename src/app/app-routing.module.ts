import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PomodoroComponent } from './home/pomodoro/pomodoro.component';
const routes: Routes = [
  {path:'',component:PomodoroComponent},{path: '**', component: PomodoroComponent}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
