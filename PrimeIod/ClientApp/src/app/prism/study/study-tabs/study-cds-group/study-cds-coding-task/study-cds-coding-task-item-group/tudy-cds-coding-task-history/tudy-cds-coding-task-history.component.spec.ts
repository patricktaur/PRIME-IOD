import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TudyCdsCodingTaskHistoryComponent } from './tudy-cds-coding-task-history.component';

describe('TudyCdsCodingTaskHistoryComponent', () => {
  let component: TudyCdsCodingTaskHistoryComponent;
  let fixture: ComponentFixture<TudyCdsCodingTaskHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TudyCdsCodingTaskHistoryComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TudyCdsCodingTaskHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
