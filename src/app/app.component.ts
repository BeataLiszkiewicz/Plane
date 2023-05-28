import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BarOnService } from './services/bar-on.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'TicketsApp';

  visible: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly barService: BarOnService,
    private readonly router:Router
  ) {}

  ngOnInit() {
    
  }

  afterViewInit(){
    this.barService.getData().subscribe({
      next: (el: string) => {
        this.visible = el;
      },
      error: (err: any) => console.log(err),
    });
  }

  

}
