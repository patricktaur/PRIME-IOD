import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdmsComponent } from './study-cdms.component';

describe('StudyCdmsComponent', () => {
  let component: StudyCdmsComponent;
  let fixture: ComponentFixture<StudyCdmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdmsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
