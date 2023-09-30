import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderTrainingComponent } from './reader-training.component';

describe('ReaderTrainingComponent', () => {
  let component: ReaderTrainingComponent;
  let fixture: ComponentFixture<ReaderTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReaderTrainingComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
