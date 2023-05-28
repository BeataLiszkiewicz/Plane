import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyChoiceComponent } from './fly-choice.component';

describe('FlyChoiceComponent', () => {
  let component: FlyChoiceComponent;
  let fixture: ComponentFixture<FlyChoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlyChoiceComponent]
    });
    fixture = TestBed.createComponent(FlyChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
