import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BarOnService } from './services/bar-on.service';
import { Router } from '@angular/router';
import { UsersService } from './services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { LogInComponent } from './components/log-in/log-in.component';
import { IsLoggedComponent } from './components/is-logged/is-logged.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loggedIn:boolean=false;
  title = 'TicketsApp';
  today:Date=new Date();
  visible: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly barService: BarOnService,
    private readonly router: Router,
    private UserService: UsersService,
    private dialogRef: MatDialog
  ) {}

  ngOnInit() {
    this.barService.getData().subscribe({
      next: (el: string) => {
        this.visible = el;
      },
      error: (err: any) => console.log(err),
    });

    setInterval(()=>{this.today=new Date()}, 1000)



  }

  openLogIn() {
    if (this.UserService.oneUser.length > 0) {
      this.dialogRef.open(IsLoggedComponent, {
        disableClose: false,
        hasBackdrop: true,
        backdropClass: '',
        width: '90%',
        height: '50%',
        position: {
          top: '',
          bottom: '',
          left: '',
          right: '',
        },
      });
     
    } else {
      this.UserService.changeOnlyLogIn(true);
      this.dialogRef.open(LogInComponent, {
        disableClose: false,
        hasBackdrop: true,
        backdropClass: '',
        width: '90%',
        height: '',
        position: {
          top: '',
          bottom: '',
          left: '',
          right: '',
        },
      });
    }
  }
}
