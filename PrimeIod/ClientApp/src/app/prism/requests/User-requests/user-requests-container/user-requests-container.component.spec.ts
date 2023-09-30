import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequestsContainerComponent } from './user-requests-container.component';

describe('UserRequestsContainerComponent', () => {
  let component: UserRequestsContainerComponent;
  let fixture: ComponentFixture<UserRequestsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRequestsContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
