import { TestBed } from '@angular/core/testing';

import { BudgetChart1Service } from './budget-chart1.service';

describe('BudgetChart1Service', () => {
  let service: BudgetChart1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetChart1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
