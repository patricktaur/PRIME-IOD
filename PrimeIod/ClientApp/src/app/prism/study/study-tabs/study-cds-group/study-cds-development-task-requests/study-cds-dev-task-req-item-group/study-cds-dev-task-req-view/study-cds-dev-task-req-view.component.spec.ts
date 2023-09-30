import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdsDevTaskReqViewComponent } from './study-cds-dev-task-req-view.component';

describe('StudyCdsDevTaskReqViewComponent', () => {
  let component: StudyCdsDevTaskReqViewComponent;
  let fixture: ComponentFixture<StudyCdsDevTaskReqViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdsDevTaskReqViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdsDevTaskReqViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
