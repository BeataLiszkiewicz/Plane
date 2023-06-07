import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  constructor(
    private readonly userService: UsersService,
    private dialogRef2: MatDialog
  ) {}

  haveUser(createUser: NgForm) {
    this.userService.createUser(createUser.value);
    this.dialogRef2.closeAll();
  }

  close() {
    this.dialogRef2.closeAll();
  }
}
