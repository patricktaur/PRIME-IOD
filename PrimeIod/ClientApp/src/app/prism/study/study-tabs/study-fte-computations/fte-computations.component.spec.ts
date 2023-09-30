import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FteComputationsComponent } from './fte-computations.component';

describe('FteComputationsComponent', () => {
  let component: FteComputationsComponent;
  let fixture: ComponentFixture<FteComputationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FteComputationsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FteComputationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
