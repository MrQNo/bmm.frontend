import { TestBed } from '@angular/core/testing';

import { DivisionDrawerService } from './division-drawer.service';

describe('DivisionDrawerService', () => {
  let service: DivisionDrawerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DivisionDrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
