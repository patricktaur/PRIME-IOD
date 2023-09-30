import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdsOutputTaskHistoryComponent } from './study-cds-output-task-history.component';

describe('StudyCdsOutputTaskHistoryComponent', () => {
  let component: StudyCdsOutputTaskHistoryComponent;
  let fixture: ComponentFixture<StudyCdsOutputTaskHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdsOutputTaskHistoryComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdsOutputTaskHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
