import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdmsContainerComponent } from './cdms-container.component';

describe('CdmsContainerComponent', () => {
  let component: CdmsContainerComponent;
  let fixture: ComponentFixture<CdmsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdmsContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdmsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
