import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityAndTmfComponent } from './quality-and-tmf.component';

describe('QualityAndTmfComponent', () => {
  let component: QualityAndTmfComponent;
  let fixture: ComponentFixture<QualityAndTmfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QualityAndTmfComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityAndTmfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
