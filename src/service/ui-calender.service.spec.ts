import { TestBed } from '@angular/core/testing';

import { UICALENDERService } from './ui-calender.service';

describe('UICALENDERService', () => {
  let service: UICALENDERService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UICALENDERService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
