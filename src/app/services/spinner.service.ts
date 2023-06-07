import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  public loading$: Observable<boolean>;
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public constructor() {
    this.loading$ = this._loading$.asObservable();
  }

  // https://javascript.plainenglish.io/loading-spinners-in-angular-two-simple-methods-f73f5c5bc078
  set(loading: boolean) {
    this._loading$.next(loading);
  }

  getData() {
    return this.loading$;
  }
}
