import { TestBed } from '@angular/core/testing';

import { BudgetBarChartService } from './budget-bar-chart.service';

describe('BudgetBarChartService', () => {
  let service: BudgetBarChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetBarChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
