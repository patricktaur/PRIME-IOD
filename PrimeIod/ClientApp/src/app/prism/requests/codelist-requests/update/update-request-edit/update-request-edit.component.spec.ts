import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequestEditComponent } from './update-request-edit.component';

describe('UpdateRequestEditComponent', () => {
  let component: UpdateRequestEditComponent;
  let fixture: ComponentFixture<UpdateRequestEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateRequestEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
