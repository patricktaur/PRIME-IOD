import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdsDelTaskHistoryComponent } from './study-cds-del-task-history.component';

describe('StudyCdsDelTaskHistoryComponent', () => {
  let component: StudyCdsDelTaskHistoryComponent;
  let fixture: ComponentFixture<StudyCdsDelTaskHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdsDelTaskHistoryComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdsDelTaskHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
