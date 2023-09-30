import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrismHomeContainerComponent } from './prism-home-container.component';

describe('PrismHomeContainerComponent', () => {
  let component: PrismHomeContainerComponent;
  let fixture: ComponentFixture<PrismHomeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrismHomeContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrismHomeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
