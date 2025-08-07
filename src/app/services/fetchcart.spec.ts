import { TestBed } from '@angular/core/testing';

import { Fetchcart } from './fetchcart';

describe('Fetchcart', () => {
  let service: Fetchcart;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fetchcart);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
