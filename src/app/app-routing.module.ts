import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { FlyChoiceComponent } from './components/fly-choice/fly-choice.component';
import { DepartureCalendarComponent } from './components/departure-calendar/departure-calendar.component';

const routes:Routes=[
  {path:'', redirectTo:'firstPage', pathMatch:'full'},
  {path:'firstPage', component:FirstPageComponent},
  {path:'flyChoice', component:FlyChoiceComponent},
  {path:'calendar',component:DepartureCalendarComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
