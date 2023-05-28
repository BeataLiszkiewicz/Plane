import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureCalendarComponent } from './departure-calendar.component';

describe('DepartureCalendarComponent', () => {
  let component: DepartureCalendarComponent;
  let fixture: ComponentFixture<DepartureCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartureCalendarComponent]
    });
    fixture = TestBed.createComponent(DepartureCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
