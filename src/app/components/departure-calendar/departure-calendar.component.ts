import { Component } from '@angular/core';
import { FlyChoiceDataService } from 'src/app/services/fly-choice-data.service';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';
import { DataFromCalendarService } from 'src/app/services/data-from-calendar.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-departure-calendar',
  templateUrl: './departure-calendar.component.html',
  styleUrls: ['./departure-calendar.component.scss'],
})
export class DepartureCalendarComponent {
  calendar: any = [];
  calendarMonth: number = 0;
  container: any = [];
  currencyRate: any = [1, 'PLN'];
  currentMonth: number = new Date().getMonth() + 1;
  currentYear: number = new Date().getFullYear();
  emptyDays: number = 0;
  lastDay: any;
  storedCurrency: string | null = sessionStorage.getItem('currency');
  today: number = new Date().getDate();
  week: any = ['Mon.', 'Tues.', 'Wed.', 'Thurs.', 'Fri.', 'Sat.', 'Sun.'];

  constructor(
    private flyChoiceService: FlyChoiceDataService,
    private exchangeService: ExchangeRateService,
    private dataServise: DataFromCalendarService,
    private dialogRef: MatDialog
  ) {}
  arrival: string = '';
  departure: string = '';

  ngOnInit() {
    // get from flyChoiceComponent information about departure and arrival
    this.flyChoiceService.getArrival().subscribe({
      next: (el: string) => {
        this.arrival = el;
      },
      error: (err: any) => console.log(err),
    });
    this.flyChoiceService.getDeparture().subscribe({
      next: (el: string) => {
        this.departure = el;
      },
      error: (err: any) => console.log(err),
    });

    if (this.storedCurrency !== null) {
      this.changeCurrency(this.storedCurrency);
    }

    // prepare base for calendar
    for (let i = 0; i < 3; i++) {
      this.calendar.push({
        year: this.currentYear,
        month: this.currentMonth,
        today: this.today,
        firstDayOfMonth: 0,
        days: [],
      });
    }
    // define year and month for calendar current+1 and curent+2
    switch (this.currentMonth) {
      case 11:
        this.calendar[2].year = this.currentYear + 1;
        this.calendar[1].month = this.currentMonth + 1;
        this.calendar[2].month = 1;
        break;
      case 12:
        this.calendar[1].year = this.currentYear + 1;
        this.calendar[2].year = this.currentYear + 1;
        this.calendar[1].month = 1;
        this.calendar[2].month = 2;
        break;
      default:
        this.calendar[1].month = this.currentMonth + 1;
        this.calendar[2].month = this.currentMonth + 2;
    }
    // get information about length of each month
    for (let i = 0; i < 3; i++) {
      this.lastDay = new Date(
        this.calendar[i].year,
        this.calendar[i].month,
        0
      ).getDate();
      // push empty "days" when month is not starting on Monday
      this.calendar[i].firstDayOfMonth = new Date(
        this.calendar[i].year,
        this.calendar[i].month - 1,
        1
      ).getDay();
      for (let j = 1; j < this.calendar[i].firstDayOfMonth; j++) {
        this.calendar[i].days.push(this.container);
      }
      // generate price for each day
      for (let k = 1; k < this.lastDay + 1; k++) {
        this.container = [
          k,
          this.generatePrice(100, 100 * this.arrival.length),
        ];
        this.calendar[i].days.push(this.container);
        this.container = [];
      }
    }

    // delete price from the past
    for (let i = 0; i < this.calendar[0].days.length; i++) {
      if (this.calendar[0].days[i] === '') {
        this.emptyDays += 1;
      }
    }

    for (let j = 0; j < this.emptyDays + this.calendar[0].today - 1; j++) {
      this.calendar[0].days[j][1] = '';
    }
  }

  generatePrice(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  // change month in a calendar
  changeMonth(param: number) {
    this.calendarMonth += param;
  }

  // change currency
  changeCurrency(param: string) {
    if (param !== 'PLN') {
      this.exchangeService.exchanegeRate(param).subscribe({
        next: (data: any) => {
          this.currencyRate[0] = data.rates[0].mid;
          this.currencyRate[1] = data.code;
        },
        error: (err: any) => console.error(err),
      });
    } else {
      this.currencyRate[0] = 1;
      this.currencyRate[1] = 'PLN';
    }
  }

  choseDate(param: any) {
    if (param[1] === '') {
      alert('Sorry, chosen date falls in the past.');
    } else {
      this.dataServise.setData({
        departureDate: new Date(
          this.calendar[this.calendarMonth].year,
          this.calendar[this.calendarMonth].month-1,
          param[0]
        ),
        // price: this.calendar[this.calendarMonth].days[param[0]][1],
        // currency: this.currencyRate[1],
        
      });
      console.log( 'for service:', new Date(
        this.calendar[this.calendarMonth].year,
        this.calendar[this.calendarMonth].month-1,
        param[0]), 'real year:',this.calendar[this.calendarMonth].year, 'real month:',  this.calendar[this.calendarMonth].month, 'real date:', param[0]);
      sessionStorage.setItem('currency', this.currencyRate[1]);
    }
    this.dialogRef.closeAll();
  }
}
