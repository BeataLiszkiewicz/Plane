import { TestBed } from '@angular/core/testing';

import { FlyChoiceDataService } from './fly-choice-data.service';

describe('FlyChoiceService', () => {
  let service: FlyChoiceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlyChoiceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
