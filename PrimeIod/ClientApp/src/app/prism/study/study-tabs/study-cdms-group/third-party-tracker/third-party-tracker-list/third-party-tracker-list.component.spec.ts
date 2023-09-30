import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyTrackerListComponent } from './third-party-tracker-list.component';

describe('ThirdPartyTrackerListComponent', () => {
  let component: ThirdPartyTrackerListComponent;
  let fixture: ComponentFixture<ThirdPartyTrackerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdPartyTrackerListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPartyTrackerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
