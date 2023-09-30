import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdsValTaskHistoryComponent } from './study-cds-val-task-history.component';

describe('StudyCdsValTaskHistoryComponent', () => {
  let component: StudyCdsValTaskHistoryComponent;
  let fixture: ComponentFixture<StudyCdsValTaskHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdsValTaskHistoryComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdsValTaskHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
