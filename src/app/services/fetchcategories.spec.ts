import { TestBed } from '@angular/core/testing';

import { Fetchcategories } from './fetchcategories';

describe('Fetchcategories', () => {
  let service: Fetchcategories;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fetchcategories);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
