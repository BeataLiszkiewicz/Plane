import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlyChoiceDataService {
  arrival=new BehaviorSubject<string>("");
  departure=new BehaviorSubject<string>("");

  constructor() { }
  setArrival(el:string){
    this.arrival.next(el)
   
  }
  getArrival(){
    return this.arrival.asObservable()
  }

  setDeparture(el:string){
    this.departure.next(el)
    
  }
  getDeparture(){
    return this.departure.asObservable()
  }
  
}
