import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequestEditComponent } from './create-request-edit.component';

describe('CreateRequestEditComponent', () => {
  let component: CreateRequestEditComponent;
  let fixture: ComponentFixture<CreateRequestEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRequestEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
