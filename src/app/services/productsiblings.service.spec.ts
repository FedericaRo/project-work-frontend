import { TestBed } from '@angular/core/testing';

import { ProductsiblingsService } from './productsiblings.service';

describe('ProductsiblingsService', () => {
  let service: ProductsiblingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsiblingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
