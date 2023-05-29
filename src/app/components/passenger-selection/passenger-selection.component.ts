import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { FlyChoiceDataService } from 'src/app/services/fly-choice-data.service';

@Component({
  selector: 'app-passenger-selection',
  templateUrl: './passenger-selection.component.html',
  styleUrls: ['./passenger-selection.component.scss'],
})
export class PassengerSelectionComponent {
  adults: number = 1;
  child: number = 0;
  infants: number = 0;
  passengers: number = 0;

  constructor(
    public dialogRef: MatDialogRef<PassengerSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  changeAdult(param: number) {
    this.adults += param;
    if (this.adults + this.child < this.infants) {
      this.infants = this.adults + this.child;
    }
  }

  changeChildren(param: number) {
    this.child += param;
    if (this.adults + this.child < this.infants) {
      this.infants = this.adults + this.child;
    }
  }

  changeInfant(param: number) {
    this.infants += param;
  }

  close(): void {
    this.dialogRef.close({
      adults: this.adults,
      children: this.child,
      infants: this.infants,
    });
  }
}
