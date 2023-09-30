import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmStudyDetailsViewComponent } from './crm-study-details-view.component';

describe('CrmStudyDetailsViewComponent', () => {
  let component: CrmStudyDetailsViewComponent;
  let fixture: ComponentFixture<CrmStudyDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmStudyDetailsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmStudyDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
