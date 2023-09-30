import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateRequestListComponent } from './deactivate-request-list.component';

describe('DeactivateRequestListComponent', () => {
  let component: DeactivateRequestListComponent;
  let fixture: ComponentFixture<DeactivateRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeactivateRequestListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivateRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
