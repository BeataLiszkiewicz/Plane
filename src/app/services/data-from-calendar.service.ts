import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataFromCalendarService {
  dataFromCalendar=new BehaviorSubject<string>("")

  constructor() { }

  getData(){
    return this.dataFromCalendar.asObservable()
  }

  setData(el:any){
    this.dataFromCalendar.next(el)
  }
}
