import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsMenuComponent } from './requests-menu.component';

describe('RequestsMenuComponent', () => {
  let component: RequestsMenuComponent;
  let fixture: ComponentFixture<RequestsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestsMenuComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
