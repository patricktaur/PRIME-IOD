import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaveUrlVersionEditComponent } from './rave-url-version-edit.component';

describe('RaveUrlVersionEditComponent', () => {
  let component: RaveUrlVersionEditComponent;
  let fixture: ComponentFixture<RaveUrlVersionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RaveUrlVersionEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaveUrlVersionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
