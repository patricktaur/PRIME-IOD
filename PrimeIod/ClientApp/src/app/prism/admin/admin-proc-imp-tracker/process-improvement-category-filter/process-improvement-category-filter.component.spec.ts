import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessImprovementCategoryFilterComponent } from './process-improvement-category-filter.component';

describe('ProcessImprovementCategoryFilterComponent', () => {
  let component: ProcessImprovementCategoryFilterComponent;
  let fixture: ComponentFixture<ProcessImprovementCategoryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessImprovementCategoryFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessImprovementCategoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
