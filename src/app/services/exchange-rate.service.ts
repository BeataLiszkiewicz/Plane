import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  constructor(private readonly http:HttpClient) { }

  exchanegeRate(param:string){
    return this.http.get<any>(`https://api.nbp.pl/api/exchangerates/rates/a/${param}/?format=json`)
  }
}
