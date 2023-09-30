import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsDelReqBaseListComponent } from './cds-del-req-base-list.component';

describe('CdsDelReqBaseListComponent', () => {
  let component: CdsDelReqBaseListComponent;
  let fixture: ComponentFixture<CdsDelReqBaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsDelReqBaseListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsDelReqBaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
