import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsDevReqBaseListComponent } from './cds-dev-req-base-list.component';

describe('CdsDevReqBaseListComponent', () => {
  let component: CdsDevReqBaseListComponent;
  let fixture: ComponentFixture<CdsDevReqBaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsDevReqBaseListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsDevReqBaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
