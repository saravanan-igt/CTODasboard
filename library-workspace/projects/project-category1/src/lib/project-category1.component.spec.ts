import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCategory1Component } from './project-category1.component';

describe('ProjectCategory1Component', () => {
  let component: ProjectCategory1Component;
  let fixture: ComponentFixture<ProjectCategory1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCategory1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCategory1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
