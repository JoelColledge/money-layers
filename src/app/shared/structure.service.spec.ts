import { TestBed, inject } from '@angular/core/testing';

import { StructureService } from './structure.service';

describe('StructureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StructureService]
    });
  });

  it('should ...', inject([StructureService], (service: StructureService) => {
    expect(service).toBeTruthy();
  }));
});
