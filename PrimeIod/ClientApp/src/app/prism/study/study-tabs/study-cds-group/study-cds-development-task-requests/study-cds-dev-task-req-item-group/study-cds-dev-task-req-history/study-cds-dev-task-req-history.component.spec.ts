import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdsDevTaskReqHistoryComponent } from './study-cds-dev-task-req-history.component';

describe('StudyCdsDevTaskReqHistoryComponent', () => {
  let component: StudyCdsDevTaskReqHistoryComponent;
  let fixture: ComponentFixture<StudyCdsDevTaskReqHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdsDevTaskReqHistoryComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdsDevTaskReqHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
