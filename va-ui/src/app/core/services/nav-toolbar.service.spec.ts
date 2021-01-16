import { TestBed } from '@angular/core/testing';

import { NavToolbarService } from './nav-toolbar.service';

describe('NavToolbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavToolbarService = TestBed.get(NavToolbarService);
    expect(service).toBeTruthy();
  });
});
