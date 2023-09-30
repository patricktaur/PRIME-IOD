import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationAndMeetingsViewComponent } from './communication-and-meetings-view.component';

describe('CommunicationAndMeetingsViewComponent', () => {
  let component: CommunicationAndMeetingsViewComponent;
  let fixture: ComponentFixture<CommunicationAndMeetingsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunicationAndMeetingsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunicationAndMeetingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
