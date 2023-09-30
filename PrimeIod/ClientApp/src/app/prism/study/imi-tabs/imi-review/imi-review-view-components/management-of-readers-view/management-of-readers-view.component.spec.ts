import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementOfReadersViewComponent } from './management-of-readers-view.component';

describe('ManagementOfReadersViewComponent', () => {
  let component: ManagementOfReadersViewComponent;
  let fixture: ComponentFixture<ManagementOfReadersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementOfReadersViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementOfReadersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
