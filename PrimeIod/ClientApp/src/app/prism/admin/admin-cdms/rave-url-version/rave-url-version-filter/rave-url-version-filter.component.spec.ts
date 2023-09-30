import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaveUrlVersionFilterComponent } from './rave-url-version-filter.component';

describe('RaveUrlVersionFilterComponent', () => {
  let component: RaveUrlVersionFilterComponent;
  let fixture: ComponentFixture<RaveUrlVersionFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RaveUrlVersionFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaveUrlVersionFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
