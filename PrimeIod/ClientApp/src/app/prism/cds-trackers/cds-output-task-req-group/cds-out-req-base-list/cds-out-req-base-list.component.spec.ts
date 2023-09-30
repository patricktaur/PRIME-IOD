import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsOutReqBaseListComponent } from './cds-out-req-base-list.component';

describe('CdsOutReqBaseListComponent', () => {
  let component: CdsOutReqBaseListComponent;
  let fixture: ComponentFixture<CdsOutReqBaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsOutReqBaseListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsOutReqBaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
