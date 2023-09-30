import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewSelectComponent } from './user-view-select.component';

describe('UserViewSelectComponent', () => {
  let component: UserViewSelectComponent;
  let fixture: ComponentFixture<UserViewSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserViewSelectComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
