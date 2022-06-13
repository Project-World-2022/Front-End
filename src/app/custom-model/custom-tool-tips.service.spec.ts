import { TestBed } from '@angular/core/testing';

import { CustomToolTipsService } from './custom-tool-tips.service';

describe('CustomToolTipsService', () => {
  let service: CustomToolTipsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomToolTipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
