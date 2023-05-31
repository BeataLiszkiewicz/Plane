import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlyChoiceDataService {
  arrival = new BehaviorSubject<string>('');
  departure = new BehaviorSubject<string>('');
  passengers = new BehaviorSubject<any>('');

  constructor() {}
  setArrival(el: string) {
    this.arrival.next(el);
  }
  getArrival() {
    return this.arrival.asObservable();
  }

  setDeparture(el: string) {
    this.departure.next(el);
  }
  getDeparture() {
    return this.departure.asObservable();
  }
  setPassengers(el: any) {
    this.passengers.next(el);
  }

  getPassengers() {
    return this.passengers.asObservable();
  }
}
