import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { DataFromCalendarService } from 'src/app/services/data-from-calendar.service';
import { FlyChoiceDataService } from 'src/app/services/fly-choice-data.service';
import data from './../../../assets/database/flyDistance.json';
import { UsersService } from 'src/app/services/users.service';
import { CalendarData } from 'src/app/interfaces/calendar-data';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  arrival: string = '';
  disabled: Array<string> = [];
  distance: string = '';
  extraLuggage: number = 0;
  extraPlusLuggage: number = 0;
  departure: string = '';
  firstUser: any = { name: '', surname: '' };
  flyDistanceInfo: any = '';
  flyDetails: CalendarData[]=[];
  getSeat: boolean = true;
  id: string = '0';
  passengers: any;
  seatSubscription: Subscription | undefined;
  seatCancelationSubscription: Subscription | undefined;
  summary: any;
  totalCost: number = 0;
  waiting: boolean = false;

  constructor(
    private readonly fromCalendar: DataFromCalendarService,
    private readonly fromFlyChoice: FlyChoiceDataService,
    private myElement: ElementRef,
    private readonly UserService: UsersService
  ) {}
  @ViewChild('plane', { static: true })
  plane!: ElementRef;

  @ViewChild('tickets', { static: true })
  tickets!: ElementRef;

  @ViewChildren('button') buttons!: QueryList<any>;

  
  ngOnInit() {
    console.log('from init', this.waiting)
    this.summary = {
      departDate: '',
      departure: '',
      arrival: '',
      price: 0,
      currency: '',
      passenger: [],
    };
    // price, date, currency
    this.fromCalendar.getData().subscribe({
      next: (el: any) => {
        this.flyDetails = el;
        this.summary.price = el.price;
        this.summary.currency = el.currency;
        this.summary.departDate = el.departureDate;
      },
      error: (err: any) => console.log(err),
    });
    // arrival, departure, passengers
    this.fromFlyChoice.getArrival().subscribe({
      next: (el: any) => {
        this.summary.arrival = el;
      },
      error: (err: any) => console.log(err),
    });
    this.fromFlyChoice.getDeparture().subscribe({
      next: (el: any) => {
        this.summary.departure = el;
      },
      error: (err: any) => console.log(err),
    });
    this.fromFlyChoice.getPassengers().subscribe({
      next: (el: any) => {
        this.passengers = el;
      },
      error: (err: any) => console.log(err),
    });
    for (let i = 0; i < this.passengers.adults; i++) {
      this.summary.passenger.push({
        status: 'Adult',
        cost: this.summary.price,
        seat: '',
        luggage: 0,
      });
    }
    for (let i = 0; i < this.passengers.children; i++) {
      this.summary.passenger.push({
        status: 'Child',
        cost: Math.round(this.summary.price * 0.7),
        seat: '',
        luggage: 0,
      });
    }
    for (let i = 0; i < this.passengers.infants; i++) {
      this.summary.passenger.push({
        status: 'Infant',
        cost: 0,
        seat: '',
        luggage: 0,
      });
    }

    // first passenger

    if (this.UserService.oneUser.length !== 0) {
      this.firstUser.name = this.UserService.oneUser[0].name;
      this.firstUser.surname = this.UserService.oneUser[0].surname;
    } else if (this.UserService.temporaryUser.name !== ''||this.UserService.temporaryUser.name !==undefined) {
      this.firstUser.name = this.UserService.temporaryUser.name;
      this.firstUser.surname = this.UserService.temporaryUser.surname;
    }
    // luggage cost

    switch (this.summary.currency) {
      case 'PLN':
        this.extraLuggage = 150;
        this.extraPlusLuggage = 175;
        break;
      case 'EUR':
        this.extraLuggage = 33;
        this.extraPlusLuggage = 39;
        break;
      case 'USD':
        this.extraLuggage = 35;
        this.extraPlusLuggage = 41;
        break;
    }
    // Fly distance
    this.flyDistanceInfo = data;
    this.distance = this.flyDistanceInfo[0][this.summary.arrival];
    // Calculate total cost
    this.calculateFinalCost();
  }
  changeLuggage(param: any) {
    switch (param[0]) {
      case 'standard':
        this.summary.passenger[param[1]].luggage = 0;
        break;
      case 'extra':
        this.summary.passenger[param[1]].luggage = this.extraLuggage;
        break;
      case 'extra+':
        this.summary.passenger[param[1]].luggage = this.extraPlusLuggage;
        break;
    }

    this.calculateFinalCost();
  }

  openPlane(param: any) {
    if (param[1] !== '') {
      this.getSeat = true;
      
    }
  }
  seat(param: any) {
    this.waiting=true;
    this.plane.nativeElement.scrollIntoView();
    this.id = param;
    if (this.getSeat) {
      this.seatSubscription = fromEvent(
        document.getElementsByClassName('button'),
        'click'
      ).subscribe({
        next: (el: any) => {
          if (el.target.name === 'clear') {
            (this.summary.passenger[param].seat = el.target.innerHTML),
              (el.target.name = 'checked'),
              this.disabled.push(el.target.innerHTML);
          } else {
            for (let i = 0; i < this.summary.passenger.length; i++) {
              if (this.summary.passenger[i].seat === el.target.innerHTML) {
                this.summary.passenger[i].seat = '';
              }
            }
            el.target.name = 'clear';
          }
        },
        error: (err) => console.log('Wystąpił błąd', err),
      });
    }
    console.log('from seat choice', this.waiting)
  }
  unsubscribe() {
    this.tickets.nativeElement.scrollIntoView();
    this.waiting=false;
    if (!this.getSeat) {
      setTimeout(() => {
        {
          (this.getSeat = true),
            this.seatCancelationSubscription!.unsubscribe();
        }
      }, 10);
    } else {
      setTimeout(() => {
        {
          this.seatSubscription!.unsubscribe();
        }
      }, 10);
    }
    console.log('unsubscribe', this.waiting)
  }

  calculateFinalCost() {
    this.totalCost = this.summary.passenger.reduce(
      (sum: number, person: any) => sum + (person.cost + person.luggage),
      0
    );
  }

  cancelSeat() {
    this.waiting = true;
    this.getSeat = false;
    this.plane.nativeElement.scrollIntoView();
    this.seatCancelationSubscription = fromEvent(
      document.getElementsByClassName('button'),
      'click'
    ).subscribe({
      next: (el: any) => {
        if (el.target.name === 'clear') {
        } else {
          for (let i = 0; i < this.summary.passenger.length; i++) {
            if (this.summary.passenger[i].seat === el.target.innerHTML) {
              this.summary.passenger[i].seat = '';
            }
          }
          el.target.name = 'clear';
        }
      },
      error: (err) => console.log('Wystąpił błąd', err),
    });
  }
}
