import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsDelReqDashNListComponent } from './cds-del-req-dash-n-list.component';

describe('CdsDelReqDashNListComponent', () => {
  let component: CdsDelReqDashNListComponent;
  let fixture: ComponentFixture<CdsDelReqDashNListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsDelReqDashNListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsDelReqDashNListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
