import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyTrackerEditComponent } from './third-party-tracker-edit.component';

describe('ThirdPartyTrackerEditComponent', () => {
  let component: ThirdPartyTrackerEditComponent;
  let fixture: ComponentFixture<ThirdPartyTrackerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdPartyTrackerEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPartyTrackerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
