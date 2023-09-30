import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequestFilterComponent } from './create-request-filter.component';

describe('CreateRequestFilterComponent', () => {
  let component: CreateRequestFilterComponent;
  let fixture: ComponentFixture<CreateRequestFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRequestFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRequestFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
