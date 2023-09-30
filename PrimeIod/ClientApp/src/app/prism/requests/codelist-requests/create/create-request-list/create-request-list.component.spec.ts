import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequestListComponent } from './create-request-list.component';

describe('CreateRequestListComponent', () => {
  let component: CreateRequestListComponent;
  let fixture: ComponentFixture<CreateRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRequestListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
