import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OpacityDirective } from './directives/opacity.directive';
import { BarOnService } from './services/bar-on.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FlyChoiceComponent } from './components/fly-choice/fly-choice.component';
import { DepartureCalendarComponent } from './components/departure-calendar/departure-calendar.component';
import { CalendarCurrencyPipe } from './pipes/calendar-currency.pipe';
import { MonthNamePipe } from './pipes/month-name.pipe';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PassengerSelectionComponent } from './components/passenger-selection/passenger-selection.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SummaryComponent } from './components/summary/summary.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UserExistDirective } from './directives/user-exist.directive';
import { PasswordLettersDirective } from './directives/password-letters.directive';
import { IsLoggedComponent } from './components/is-logged/is-logged.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ApiInterceptor } from './interceptors/api.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    FirstPageComponent,
    OpacityDirective,
    FlyChoiceComponent,
    DepartureCalendarComponent,
    CalendarCurrencyPipe,
    MonthNamePipe,
    PassengerSelectionComponent,
    LogInComponent,
    SummaryComponent,
    CreateUserComponent,
    UserExistDirective,
    PasswordLettersDirective,
    IsLoggedComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule
  ],
  providers: [
    BarOnService,
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
