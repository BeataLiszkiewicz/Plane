import { TestBed } from '@angular/core/testing';

import { DataFromCalendarService } from './data-from-calendar.service';

describe('DataFromCalendarService', () => {
  let service: DataFromCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFromCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
