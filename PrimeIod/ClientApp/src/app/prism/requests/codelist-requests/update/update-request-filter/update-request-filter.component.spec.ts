import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequestFilterComponent } from './update-request-filter.component';

describe('UpdateRequestFilterComponent', () => {
  let component: UpdateRequestFilterComponent;
  let fixture: ComponentFixture<UpdateRequestFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateRequestFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRequestFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
