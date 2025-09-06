import { TestBed } from '@angular/core/testing';

import { UtitlityServiceService } from './utitlity-service.service';

describe('UtitlityServiceService', () => {
  let service: UtitlityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtitlityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
