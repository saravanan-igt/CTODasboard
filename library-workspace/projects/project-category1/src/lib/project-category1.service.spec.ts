import { TestBed } from '@angular/core/testing';

import { ProjectCategory1Service } from './project-category1.service';

describe('ProjectCategory1Service', () => {
  let service: ProjectCategory1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectCategory1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
