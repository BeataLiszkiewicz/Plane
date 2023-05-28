import { TestBed } from '@angular/core/testing';

import { BarOnService } from './bar-on.service';

describe('BarOnService', () => {
  let service: BarOnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarOnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
