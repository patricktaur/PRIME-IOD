import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastSavedComponent } from './last-saved.component';

describe('LastSavedComponent', () => {
  let component: LastSavedComponent;
  let fixture: ComponentFixture<LastSavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastSavedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
