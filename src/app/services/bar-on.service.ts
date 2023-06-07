import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BarOnService {
  constructor() {}

  unhide = new BehaviorSubject<string>('false');

  setData(el: string) {
    this.unhide.next(el);
  }
  getData() {
    return this.unhide.asObservable();
  }
}
