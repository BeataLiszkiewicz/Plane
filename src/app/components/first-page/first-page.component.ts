import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { BarOnService } from 'src/app/services/bar-on.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss'],
  animations: [
    trigger('justFly', [
      state('start', style({ rotate: '0deg' })),
      state(
        'fly',
        style({
          transform: 'translate(0vw, -270vh)',
          scale: 0.5,
          rotate: '-45deg',
          transformOrigin: 'top left',
        })
      ),
      transition('*=>start', animate('800ms')),
      transition('start=>fly', animate('3000ms')),
    ]),
  ],
})
export class FirstPageComponent {
  disappear:string=""
  flyStart: string = '';
  globtrotter: Array<string> = [
    "assets/pictures/travelPlan.jpg",
    'assets/pictures/airCrew.jpg',
    'assets/pictures/goodFood.jpg',
    'assets/pictures/inside.jpg',
  ];
  
  constructor(private readonly barService:BarOnService,
    private router:Router){}

  flyFly() {
    this.flyStart = 'start';
    setTimeout(() => {
      this.flyStart = 'fly';
    }, 800);
    setTimeout(() => {
      this.disappear="disappear"
    }, 1500);
    setTimeout(() => {
      this.barService.setData("showLogin"),
      this.router.navigate(['/flyChoice'])
    }, 2200);
  }
}
