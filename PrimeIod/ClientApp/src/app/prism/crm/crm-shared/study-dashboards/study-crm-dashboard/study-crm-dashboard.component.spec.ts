import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCrmDashboardComponent } from './study-crm-dashboard.component';

describe('StudyCrmDashboardComponent', () => {
  let component: StudyCrmDashboardComponent;
  let fixture: ComponentFixture<StudyCrmDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCrmDashboardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCrmDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
