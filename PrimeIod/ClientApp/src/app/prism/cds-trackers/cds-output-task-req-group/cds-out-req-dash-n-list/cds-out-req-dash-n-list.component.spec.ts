import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsOutReqDashNListComponent } from './cds-out-req-dash-n-list.component';

describe('CdsOutReqDashNListComponent', () => {
  let component: CdsOutReqDashNListComponent;
  let fixture: ComponentFixture<CdsOutReqDashNListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsOutReqDashNListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsOutReqDashNListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
