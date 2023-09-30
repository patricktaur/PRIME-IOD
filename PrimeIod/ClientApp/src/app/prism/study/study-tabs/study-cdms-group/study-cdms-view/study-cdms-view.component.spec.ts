import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdmsViewComponent } from './study-cdms-view.component';

describe('StudyCdmsViewComponent', () => {
  let component: StudyCdmsViewComponent;
  let fixture: ComponentFixture<StudyCdmsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyCdmsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyCdmsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
