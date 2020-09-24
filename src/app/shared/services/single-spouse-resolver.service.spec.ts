import { TestBed } from '@angular/core/testing';

import { SingleSpouseResolverService } from './single-spouse-resolver.service';

describe('SingleSpouseResolverService', () => {
  let service: SingleSpouseResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleSpouseResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
