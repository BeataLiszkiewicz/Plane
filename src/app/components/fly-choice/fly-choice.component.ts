import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import data from '../../../assets/database/departureAirports.json';
import { Router } from '@angular/router';
import { FlyChoiceDataService } from 'src/app/services/fly-choice-data.service';
import { BarOnService } from 'src/app/services/bar-on.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DepartureCalendarComponent } from '../departure-calendar/departure-calendar.component';
import { DataFromCalendarService } from 'src/app/services/data-from-calendar.service';
import { PassengerSelectionComponent } from '../passenger-selection/passenger-selection.component';
import { WeatherApiService } from 'src/app/services/weather-api.service';
import coordinates from './../../../assets/database/cityCoordinates.json';
import { LogInComponent } from '../log-in/log-in.component';

@Component({
  selector: 'app-fly-choice',
  templateUrl: './fly-choice.component.html',
  styleUrls: ['./fly-choice.component.scss'],
})
export class FlyChoiceComponent {
  adults:number=0;
  allAirports: any;
  allDepartureAirports: number = 0;
  arrival: string = '';
  availableArrivals: Array<string> = [];
  availableDepartures: Array<string> = [];
  children:number=0;
  city: any;
  dailyWeatherForecast: any = [];
  departure: string = '';
  disable = false;
  fromCalendar: any;
  infants:number=0;
  oneAirport: any;
  passengersSelection: any;
  passengersNumber: number = 0;
  someAirports: Array<string> = [];
  weatherForecast: any;

  constructor(
    private readonly form: FormBuilder,
    private router: Router,
    private flyChoiceService: FlyChoiceDataService,
    private barOnServise: BarOnService,
    private dialogRef: MatDialog,
    private dataService: DataFromCalendarService,
    private passengersInfo: MatDialogRef<PassengerSelectionComponent>,
    private weatherService: WeatherApiService
  ) {}

  ngOnInit() {
    this.barOnServise.setData('showLogin');
    this.allAirports = data;
    for (let i = 0; i < this.allAirports.length; i++) {
      this.availableDepartures.push(this.allAirports[i].departureAirport);

      for (let j = 0; j < this.allAirports[i].arrivalAirports.length; j++) {
        if (
          !this.availableArrivals.includes(
            this.allAirports[i].arrivalAirports[j]
          )
        ) {
          this.availableArrivals.push(this.allAirports[i].arrivalAirports[j]);
        }
      }
      this.sort(this.availableArrivals);
      this.sort(this.availableDepartures);
      this.allDepartureAirports = this.availableDepartures.length;
    }

    this.dataService.getData().subscribe({
      next: (el: any) => {
        this.fromCalendar = el;
        if (el !== '') {
          this.disable = true;
        }
      },
      error: (err: any) => console.log(err),
    });
  }

  sort(param: Array<string>) {
    param.sort();
  }

  arrivalAirportsOpen(param: string) {
    if (param !== ''&&this.departure!==param) {
      this.dailyWeatherForecast=[];
      this.oneAirport = this.allAirports.find(
        (el: any) => el.departureAirport === param
      );
      this.availableArrivals = this.oneAirport.arrivalAirports;

      this.departure = param;
      this.flyChoiceService.setDeparture(this.departure);

      // get coordinates of departure airport
      this.city = coordinates.filter((item) => item.airport === this.departure);
      this.weatherService.weather(this.city).subscribe({
        next: (data: any) => {
          this.dailyWeatherForecast.push({
            day: new Date(data.list[0].dt_txt).getDate(),
                date: new Date(data.list[0].dt_txt),
                temp:Math.round(data.list[0].main.feels_like),
                weather:data.list[0].weather[0].main
          });
          for (let i = 1; i < data.list.length; i++) {
            if (
              new Date(data.list[i].dt_txt).getDate() !==
              this.dailyWeatherForecast[this.dailyWeatherForecast.length-1].day
            ) {
              this.dailyWeatherForecast.push({
                day: new Date(data.list[i].dt_txt).getDate(),
                date: new Date(data.list[i].dt_txt),
                temp:Math.round(data.list[i].main.feels_like),
                weather:data.list[i].weather[0].main
              });
            }
          }
        },
        error: (err: any) => console.error(err),
      });
    }
  }

  departureAirports(param: string) {
    console.log(this.dailyWeatherForecast);
    if (param !== '') {
      if (this.departure !== '') {
        this.availableDepartures = [this.departure];
      } else {
        this.availableDepartures = [];
      }
      for (let i = 0; i < this.allDepartureAirports; i++) {
        if (
          this.allAirports[i].arrivalAirports.includes(param) &&
          !this.availableDepartures.includes(
            this.allAirports[i].departureAirport
          )
        ) {
          this.availableDepartures.push(this.allAirports[i].departureAirport);
        }
      }
      this.arrival = param;
      this.flyChoiceService.setArrival(this.arrival);
    }
  }

  openCalendar() {
    this.dialogRef.open(DepartureCalendarComponent, {
      disableClose: false,
      hasBackdrop: true,
      backdropClass: '',
      minWidth: '375px',
      height: '',
      position: {
        top: '',
        bottom: '',
        left: '',
        right: '',
      },
    });
  }

  openPassengerChoice() {
    const passengersInfo = this.dialogRef.open(PassengerSelectionComponent, {
      disableClose: false,
      hasBackdrop: true,
      backdropClass: '',
      minWidth: '80%',
      height: '',
      position: {
        top: '',
        bottom: '',
        left: '',
        right: '',
      },
    });

    passengersInfo.afterClosed().subscribe((result) => {
      this.passengersNumber = result.adults + result.children + result.infants;
    });
  }

  buy() {
    const logIn = this.dialogRef.open(LogInComponent, {
      disableClose: true,
      hasBackdrop: true,
      backdropClass: '',
      minWidth: '80%',
      height: '',
      position: {
        top: '',
        bottom: '',
        left: '',
        right: '',
      },
  })};
}