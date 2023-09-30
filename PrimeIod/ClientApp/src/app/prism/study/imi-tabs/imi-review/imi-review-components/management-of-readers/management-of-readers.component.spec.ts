import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementOfReadersComponent } from './management-of-readers.component';

describe('ManagementOfReadersComponent', () => {
  let component: ManagementOfReadersComponent;
  let fixture: ComponentFixture<ManagementOfReadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagementOfReadersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementOfReadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
