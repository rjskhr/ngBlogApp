import { TestBed, inject } from '@angular/core/testing';

import { BlogActionService } from './blog-action.service';

describe('BlogActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogActionService]
    });
  });

  it('should be created', inject([BlogActionService], (service: BlogActionService) => {
    expect(service).toBeTruthy();
  }));
});
