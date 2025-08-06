import { TestBed } from '@angular/core/testing';

import { Fetchproducts } from './fetchproducts';

describe('Fetchproducts', () => {
  let service: Fetchproducts;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fetchproducts);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
