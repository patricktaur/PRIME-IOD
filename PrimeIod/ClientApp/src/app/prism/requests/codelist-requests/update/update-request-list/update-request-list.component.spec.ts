import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequestListComponent } from './update-request-list.component';

describe('UpdateRequestListComponent', () => {
  let component: UpdateRequestListComponent;
  let fixture: ComponentFixture<UpdateRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateRequestListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
