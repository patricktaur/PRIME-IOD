import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationAndMeetingsComponent } from './communication-and-meetings.component';

describe('CommunicationAndMeetingsComponent', () => {
  let component: CommunicationAndMeetingsComponent;
  let fixture: ComponentFixture<CommunicationAndMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunicationAndMeetingsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationAndMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
