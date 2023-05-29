import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {


  constructor(private readonly router:Router,
    private dialogRef:MatDialog){}

  continue(){
    this.router.navigate(['/summary'])
    this.dialogRef.closeAll()

  }
}
