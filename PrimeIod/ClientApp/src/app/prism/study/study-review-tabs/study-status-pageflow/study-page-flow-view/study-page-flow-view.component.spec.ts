import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyPageFlowViewComponent } from './study-page-flow-view.component';

describe('StudyPageFlowViewComponent', () => {
  let component: StudyPageFlowViewComponent;
  let fixture: ComponentFixture<StudyPageFlowViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyPageFlowViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyPageFlowViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
