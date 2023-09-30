import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdsInstTaskHistoryComponent } from './study-cds-inst-task-history.component';

describe('StudyCdsInstTaskHistoryComponent', () => {
  let component: StudyCdsInstTaskHistoryComponent;
  let fixture: ComponentFixture<StudyCdsInstTaskHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdsInstTaskHistoryComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdsInstTaskHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
