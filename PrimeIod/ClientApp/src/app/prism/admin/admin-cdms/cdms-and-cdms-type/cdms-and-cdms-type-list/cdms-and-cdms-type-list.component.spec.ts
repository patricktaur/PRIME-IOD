import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmsAndCdmsTypeListComponent } from './cdms-and-cdms-type-list.component';

describe('CdmsAndCdmsTypeListComponent', () => {
  let component: CdmsAndCdmsTypeListComponent;
  let fixture: ComponentFixture<CdmsAndCdmsTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdmsAndCdmsTypeListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmsAndCdmsTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
