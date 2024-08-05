import { TestBed } from '@angular/core/testing';

import { FathersService } from './fathers.service';

describe('FathersService', () => {
  let service: FathersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FathersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
