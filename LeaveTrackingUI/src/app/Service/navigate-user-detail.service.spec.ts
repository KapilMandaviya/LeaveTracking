import { TestBed } from '@angular/core/testing';

import { NavigateUserDetailService } from './navigate-user-detail.service';

describe('NavigateUserDetailService', () => {
  let service: NavigateUserDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigateUserDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
