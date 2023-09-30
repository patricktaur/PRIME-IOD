import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcImpTrackerItemGrpContainerComponent } from './proc-imp-tracker-item-grp-container.component';

describe('ProcImpTrackerItemGrpContainerComponent', () => {
  let component: ProcImpTrackerItemGrpContainerComponent;
  let fixture: ComponentFixture<ProcImpTrackerItemGrpContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcImpTrackerItemGrpContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcImpTrackerItemGrpContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
