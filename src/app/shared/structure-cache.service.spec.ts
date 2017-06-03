import { TestBed, inject } from '@angular/core/testing';

import { StructureCacheService } from './structure-cache.service';

describe('StructureCacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StructureCacheService]
    });
  });

  it('should ...', inject([StructureCacheService], (service: StructureCacheService) => {
    expect(service).toBeTruthy();
  }));
});
