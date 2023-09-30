import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyTrackerContainerComponent } from './third-party-tracker-container.component';

describe('ThirdPartyTrackerContainerComponent', () => {
  let component: ThirdPartyTrackerContainerComponent;
  let fixture: ComponentFixture<ThirdPartyTrackerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdPartyTrackerContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPartyTrackerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
