import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { DataFromCalendarService } from 'src/app/services/data-from-calendar.service';
import { FlyChoiceDataService } from 'src/app/services/fly-choice-data.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  arrival: string = '';
  disabled: Array<string> = [];
  extraLuggage: number = 0;
  extraPlusLuggage: number = 0;
  departure: string = '';
  flyDetails: any;
  id: string = '0';
  passengers: any;
  seatSubscription: Subscription | undefined;
  summary: any;
  totalCost: number = 0;
  waiting: boolean = false;

  constructor(
    private readonly fromCalendar: DataFromCalendarService,
    private readonly fromFlyChoice: FlyChoiceDataService,
    private myElement: ElementRef
  ) {}
  @ViewChild('plane', { static: true })
  plane!: ElementRef;

  @ViewChild('tickets', { static: true })
  tickets!: ElementRef;

  ngOnInit() {
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
        // this.arrival = el;
        this.summary.arrival = el;
      },
      error: (err: any) => console.log(err),
    });
    this.fromFlyChoice.getDeparture().subscribe({
      next: (el: any) => {
        // this.departure = el;
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
        luggage:0 
      });
    }
    for (let i = 0; i < this.passengers.children; i++) {
      this.summary.passenger.push({
        status: 'Child',
        cost: Math.round(this.summary.price * 0.7),
        seat: '',
        luggage:0
      });
    }
    for (let i = 0; i < this.passengers.infants; i++) {
      this.summary.passenger.push({ status: 'Infant', cost: 0, seat: '', luggage:0 });
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

    this.calculateFinalCost();
  }
  changeLuggage(param: any) {
    switch (param[0]) {
      case 'standard':
        this.summary.passenger[param[1]].luggage=0;
        break;
      case 'extra':
        this.summary.passenger[param[1]].luggage=this.extraLuggage;
        break;
      case 'extra+':
        this.summary.passenger[param[1]].luggage=this.extraPlusLuggage;
        break;

    }
    console.log(this.summary.passenger)
    this.calculateFinalCost();
  }

  openPlane() {
    this.waiting = true;
  }
  seat(param: any) {
    this.plane.nativeElement.scrollIntoView();
    this.id = param;
    this.seatSubscription = fromEvent(
      document.getElementsByClassName('button'),
      'click'
    ).subscribe({
      next: (el: any) => {
        if (el.target.name === 'clear') {
          (this.summary.passenger[param].seat = el.target.innerHTML),
            (el.target.name = 'checked'),
            this.disabled.push(el.target.innerHTML),
            console.log(el);
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
  unsubscribe() {
    this.tickets.nativeElement.scrollIntoView();

    setTimeout(() => {
      {
        this.seatSubscription!.unsubscribe(),
          (this.waiting = false)
      }
    }, 10);
  }

  calculateFinalCost() {
    this.totalCost = this.summary.passenger.reduce(
      (sum: number, person: any) => sum + (person.cost+person.luggage),
      0
    );
  }
}
