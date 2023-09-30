import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdmsExtractSpecificationComponent } from './study-cdms-extract-specification.component';

describe('StudyCdmsExtractSpecificationComponent', () => {
  let component: StudyCdmsExtractSpecificationComponent;
  let fixture: ComponentFixture<StudyCdmsExtractSpecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyCdmsExtractSpecificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyCdmsExtractSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
