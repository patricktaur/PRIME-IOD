import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyPageFlowComponent } from './study-page-flow.component';

describe('StudyPageFlowComponent', () => {
  let component: StudyPageFlowComponent;
  let fixture: ComponentFixture<StudyPageFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyPageFlowComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyPageFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
