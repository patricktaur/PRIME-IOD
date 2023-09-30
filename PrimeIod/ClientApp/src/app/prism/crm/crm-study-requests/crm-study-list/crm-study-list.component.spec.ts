import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmStudyListComponent } from './crm-study-list.component';

describe('CrmStudyListComponent', () => {
  let component: CrmStudyListComponent;
  let fixture: ComponentFixture<CrmStudyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmStudyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmStudyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
