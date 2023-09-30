import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmStudyContainterComponent } from './crm-study-containter.component';

describe('CrmStudyContainterComponent', () => {
  let component: CrmStudyContainterComponent;
  let fixture: ComponentFixture<CrmStudyContainterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmStudyContainterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmStudyContainterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
