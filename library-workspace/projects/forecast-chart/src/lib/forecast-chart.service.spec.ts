import { TestBed } from '@angular/core/testing';

import { ForecastChartService } from './forecast-chart.service';

describe('ForecastChartService', () => {
  let service: ForecastChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForecastChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
