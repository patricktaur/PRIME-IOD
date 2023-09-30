import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderTrainingViewComponent } from './reader-training-view.component';

describe('ReaderTrainingViewComponent', () => {
  let component: ReaderTrainingViewComponent;
  let fixture: ComponentFixture<ReaderTrainingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaderTrainingViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReaderTrainingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
