import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  constructor(private readonly http: HttpClient) {}

  weather(param: any) {
    return this.http.get<any>(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${param[0].lat}&lon=${param[0].lon}&units=metric&appid=389125efa28b4a1ca40061123ec8bb34`
    );
  }
}
