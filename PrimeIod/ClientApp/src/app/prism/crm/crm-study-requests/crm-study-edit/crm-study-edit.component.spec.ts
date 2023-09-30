import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmStudyEditComponent } from './crm-study-edit.component';

describe('CrmStudyEditComponent', () => {
  let component: CrmStudyEditComponent;
  let fixture: ComponentFixture<CrmStudyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmStudyEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmStudyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
