import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgDataAndReadForecastingViewComponent } from './img-data-and-read-forecasting-view.component';

describe('ImgDataAndReadForecastingViewComponent', () => {
  let component: ImgDataAndReadForecastingViewComponent;
  let fixture: ComponentFixture<ImgDataAndReadForecastingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgDataAndReadForecastingViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgDataAndReadForecastingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
