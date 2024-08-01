import { TestBed } from '@angular/core/testing';

import { StoredtaskService } from './storedtask.service';

describe('StoredtaskService', () => {
  let service: StoredtaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoredtaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
