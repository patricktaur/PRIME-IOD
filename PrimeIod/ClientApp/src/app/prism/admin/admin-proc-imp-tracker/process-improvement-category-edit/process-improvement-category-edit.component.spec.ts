import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessImprovementCategoryEditComponent } from './process-improvement-category-edit.component';

describe('ProcessImprovementCategoryEditComponent', () => {
  let component: ProcessImprovementCategoryEditComponent;
  let fixture: ComponentFixture<ProcessImprovementCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessImprovementCategoryEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessImprovementCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
