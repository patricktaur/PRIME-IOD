import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgDataAndReadForecastingComponent } from './img-data-and-read-forecasting.component';

describe('ImgDataAndReadForecastingComponent', () => {
  let component: ImgDataAndReadForecastingComponent;
  let fixture: ComponentFixture<ImgDataAndReadForecastingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImgDataAndReadForecastingComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgDataAndReadForecastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
