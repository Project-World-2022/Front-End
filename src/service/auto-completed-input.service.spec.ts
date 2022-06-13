import { TestBed } from '@angular/core/testing';

import { AutoCompletedInputService } from './auto-completed-input.service';

describe('AutoCompletedInputService', () => {
  let service: AutoCompletedInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoCompletedInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
