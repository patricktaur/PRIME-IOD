import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiTrackerItemDashboardComponent } from './imi-tracker-item-dashboard.component';

describe('ImiTrackerItemDashboardComponent', () => {
  let component: ImiTrackerItemDashboardComponent;
  let fixture: ComponentFixture<ImiTrackerItemDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiTrackerItemDashboardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiTrackerItemDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
