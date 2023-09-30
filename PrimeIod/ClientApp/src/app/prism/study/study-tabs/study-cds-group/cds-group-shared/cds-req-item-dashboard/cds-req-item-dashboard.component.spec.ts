import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsReqItemDashboardComponent } from './cds-req-item-dashboard.component';

describe('CdsReqItemDashboardComponent', () => {
  let component: CdsReqItemDashboardComponent;
  let fixture: ComponentFixture<CdsReqItemDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsReqItemDashboardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsReqItemDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
