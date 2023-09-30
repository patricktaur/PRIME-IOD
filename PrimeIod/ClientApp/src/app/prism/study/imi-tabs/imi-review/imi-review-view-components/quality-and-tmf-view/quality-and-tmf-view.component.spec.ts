import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityAndTmfViewComponent } from './quality-and-tmf-view.component';

describe('QualityAndTmfViewComponent', () => {
  let component: QualityAndTmfViewComponent;
  let fixture: ComponentFixture<QualityAndTmfViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityAndTmfViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityAndTmfViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
