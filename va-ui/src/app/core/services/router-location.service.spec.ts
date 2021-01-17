import { TestBed } from '@angular/core/testing';

import { RouterLocationService } from './router-location.service';

describe('RouterLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouterLocationService = TestBed.get(RouterLocationService);
    expect(service).toBeTruthy();
  });
});
