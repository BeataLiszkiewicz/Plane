import { Component } from '@angular/core';
import { DataFromCalendarService } from 'src/app/services/data-from-calendar.service';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  flyDetails:any;
  passengers:any;
  
  constructor(private readonly fromCalendar:DataFromCalendarService){}

  ngOnInit(){
    this.fromCalendar.getData().subscribe({
      next: (el: any) => {
        this.flyDetails = el;
      },
      error: (err: any) => console.log(err),
    })
    console.log(this.flyDetails)
  }
}
