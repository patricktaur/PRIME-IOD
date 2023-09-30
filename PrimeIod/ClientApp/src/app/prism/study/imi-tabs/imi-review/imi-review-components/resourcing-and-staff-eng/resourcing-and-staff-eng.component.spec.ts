import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcingAndStaffEngComponent } from './resourcing-and-staff-eng.component';

describe('ResourcingAndStaffEngComponent', () => {
  let component: ResourcingAndStaffEngComponent;
  let fixture: ComponentFixture<ResourcingAndStaffEngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourcingAndStaffEngComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcingAndStaffEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
