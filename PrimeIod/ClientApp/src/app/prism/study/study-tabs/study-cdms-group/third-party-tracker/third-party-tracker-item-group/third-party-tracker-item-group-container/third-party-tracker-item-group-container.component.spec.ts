import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyTrackerItemGroupContainerComponent } from './third-party-tracker-item-group-container.component';

describe('ThirdPartyTrackerItemGroupContainerComponent', () => {
  let component: ThirdPartyTrackerItemGroupContainerComponent;
  let fixture: ComponentFixture<ThirdPartyTrackerItemGroupContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdPartyTrackerItemGroupContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPartyTrackerItemGroupContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
