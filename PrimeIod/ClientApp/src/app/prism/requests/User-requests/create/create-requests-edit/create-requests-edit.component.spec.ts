import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequestsEditComponent } from './create-requests-edit.component';

describe('CreateRequestsEditComponent', () => {
  let component: CreateRequestsEditComponent;
  let fixture: ComponentFixture<CreateRequestsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRequestsEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRequestsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
