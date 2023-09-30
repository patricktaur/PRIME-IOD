import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmsMenuComponent } from './cdms-menu.component';

describe('CdmsMenuComponent', () => {
  let component: CdmsMenuComponent;
  let fixture: ComponentFixture<CdmsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdmsMenuComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
