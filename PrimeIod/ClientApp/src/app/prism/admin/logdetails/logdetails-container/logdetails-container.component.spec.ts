import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogdetailsContainerComponent } from './logdetails-container.component';

describe('LogContainerComponent', () => {
  let component: LogdetailsContainerComponent;
  let fixture: ComponentFixture<LogdetailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogdetailsContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogdetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
