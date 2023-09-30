import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessImprovementCategoryListComponent } from './process-improvement-category-list.component';

describe('ProcessImprovementCategoryListComponent', () => {
  let component: ProcessImprovementCategoryListComponent;
  let fixture: ComponentFixture<ProcessImprovementCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessImprovementCategoryListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessImprovementCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
