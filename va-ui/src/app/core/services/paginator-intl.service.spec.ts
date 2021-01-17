import { TestBed } from '@angular/core/testing';

import { PaginatorIntlService } from './paginator-intl.service';

describe('PaginatorIntlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaginatorIntlService = TestBed.get(PaginatorIntlService);
    expect(service).toBeTruthy();
  });
});
