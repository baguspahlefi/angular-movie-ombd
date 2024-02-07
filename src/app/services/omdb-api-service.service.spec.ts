import { TestBed } from '@angular/core/testing';

import { OmdbApiServiceService } from './omdb-api-service.service';

describe('OmdbApiServiceService', () => {
  let service: OmdbApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OmdbApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
