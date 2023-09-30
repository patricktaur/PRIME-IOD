import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyTrackerViewComponent } from './third-party-tracker-view.component';

describe('ThirdPartyTrackerViewComponent', () => {
  let component: ThirdPartyTrackerViewComponent;
  let fixture: ComponentFixture<ThirdPartyTrackerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdPartyTrackerViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPartyTrackerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
