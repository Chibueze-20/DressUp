import { TestBed, inject } from '@angular/core/testing';

import { ViewserviceService } from './viewservice.service';

describe('ViewserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewserviceService]
    });
  });

  it('should be created', inject([ViewserviceService], (service: ViewserviceService) => {
    expect(service).toBeTruthy();
  }));
});
