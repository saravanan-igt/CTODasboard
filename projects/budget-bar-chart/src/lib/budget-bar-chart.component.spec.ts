import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetBarChartComponent } from './budget-bar-chart.component';

describe('BudgetBarChartComponent', () => {
  let component: BudgetBarChartComponent;
  let fixture: ComponentFixture<BudgetBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
