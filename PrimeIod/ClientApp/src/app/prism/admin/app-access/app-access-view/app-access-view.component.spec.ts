import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAccessViewComponent } from './app-access-view.component';

describe('AppAccessViewComponent', () => {
  let component: AppAccessViewComponent;
  let fixture: ComponentFixture<AppAccessViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppAccessViewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAccessViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
