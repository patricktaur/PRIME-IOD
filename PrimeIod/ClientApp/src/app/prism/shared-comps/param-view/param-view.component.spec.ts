import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamViewComponent } from './param-view.component';

describe('ParamViewComponent', () => {
  let component: ParamViewComponent;
  let fixture: ComponentFixture<ParamViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParamViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
