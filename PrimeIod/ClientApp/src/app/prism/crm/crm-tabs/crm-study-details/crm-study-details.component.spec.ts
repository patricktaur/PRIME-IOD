import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmStudyDetailsComponent } from './crm-study-details.component';

describe('CrmStudyDetailsComponent', () => {
  let component: CrmStudyDetailsComponent;
  let fixture: ComponentFixture<CrmStudyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrmStudyDetailsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmStudyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
