import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLayoutOneComponent } from './home-layout-one.component';

describe('HomeLayoutOneComponent', () => {
  let component: HomeLayoutOneComponent;
  let fixture: ComponentFixture<HomeLayoutOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeLayoutOneComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLayoutOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
