import { TestBed } from '@angular/core/testing';

import { DbAuthenticationService } from './db-authentication.service';

describe('DbAuthenticationService', () => {
  let service: DbAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
