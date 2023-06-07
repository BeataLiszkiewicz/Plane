import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { FlyChoiceComponent } from './components/fly-choice/fly-choice.component';
import { DepartureCalendarComponent } from './components/departure-calendar/departure-calendar.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SummaryComponent } from './components/summary/summary.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { IsLoggedComponent } from './components/is-logged/is-logged.component';

const routes:Routes=[
  {path:'', redirectTo:'firstPage', pathMatch:'full'},
  {path:'firstPage', component:FirstPageComponent},
  {path:'flyChoice', component:FlyChoiceComponent},
  {path:'calendar',component:DepartureCalendarComponent},
  {path:'login', component:LogInComponent},
  {path:'summary', component:SummaryComponent},
  {path:'createUser', component:CreateUserComponent},
  {path:'isLogged', component:IsLoggedComponent}
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
