import { TestBed } from '@angular/core/testing';

import { LoadingIndicatorService } from './loading-indicator.service';

describe('LoadingIndicatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadingIndicatorService = TestBed.get(
      LoadingIndicatorService
    );
    expect(service).toBeTruthy();
  });
});
