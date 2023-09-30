import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossFunctionalComponent } from './cross-functional.component';

describe('CrossFunctionalComponent', () => {
  let component: CrossFunctionalComponent;
  let fixture: ComponentFixture<CrossFunctionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrossFunctionalComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossFunctionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
