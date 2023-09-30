import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequestsListComponent } from './create-requests-list.component';

describe('CreateRequestsListComponent', () => {
  let component: CreateRequestsListComponent;
  let fixture: ComponentFixture<CreateRequestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRequestsListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
