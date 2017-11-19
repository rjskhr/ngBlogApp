import { TestBed, inject } from '@angular/core/testing';

import { BlogDataService } from './blog-data.service';

describe('BlogDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogDataService]
    });
  });

  it('should be created', inject([BlogDataService], (service: BlogDataService) => {
    expect(service).toBeTruthy();
  }));
});
