import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerSelectionComponent } from './passenger-selection.component';

describe('PassengerSelectionComponent', () => {
  let component: PassengerSelectionComponent;
  let fixture: ComponentFixture<PassengerSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassengerSelectionComponent]
    });
    fixture = TestBed.createComponent(PassengerSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
