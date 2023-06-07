import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  incorrectLogin: boolean = false;
  incorrectdata: boolean = false;
  login: string = '';
  onlyLogin: boolean = false;
  password: string = '';

  constructor(
    private readonly router: Router,
    private dialogRef: MatDialog,
    private readonly UserService: UsersService
  ) {}

  ngOnInit() {
    this.onlyLogin = this.UserService.onlyLogIn;
  }
  ngOnDestroy() {
    this.incorrectLogin = false;
    this.incorrectdata = false;
    this.UserService.changeOnlyLogIn(false);
  }
  continue(param: any) {
    if (this.login !== '' && this.password !== '') {
      this.UserService.logIn([this.login, this.password]);

      if (this.UserService.oneUser.length > 0) {
        this.incorrectLogin = false;
        if (!this.onlyLogin) {
          this.router.navigate(['/summary']);
        }

        this.dialogRef.closeAll();
      } else {
        this.incorrectLogin = true;
      }
    } else if (param[1] === true) {
      this.UserService.createTemporaryUser(param[0]);
      this.router.navigate(['/summary']);
      this.dialogRef.closeAll();
    } else {
      this.incorrectdata = true;
    }
  }

  create() {
    const createUser = this.dialogRef.open(CreateUserComponent, {
      disableClose: false,
      hasBackdrop: true,
      backdropClass: '',
      minWidth: '100%',
      height: '100%',
      position: {
        top: '',
        bottom: '',
        left: '',
        right: '',
      },
    });
  }
}
