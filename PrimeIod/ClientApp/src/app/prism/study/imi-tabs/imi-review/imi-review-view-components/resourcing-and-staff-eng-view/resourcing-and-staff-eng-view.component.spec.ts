import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcingAndStaffEngViewComponent } from './resourcing-and-staff-eng-view.component';

describe('ResourcingAndStaffEngViewComponent', () => {
  let component: ResourcingAndStaffEngViewComponent;
  let fixture: ComponentFixture<ResourcingAndStaffEngViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcingAndStaffEngViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourcingAndStaffEngViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
