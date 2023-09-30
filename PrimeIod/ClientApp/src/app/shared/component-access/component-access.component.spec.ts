import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentAccessComponent } from './component-access.component';

describe('ComponentAccessComponent', () => {
  let component: ComponentAccessComponent;
  let fixture: ComponentFixture<ComponentAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponentAccessComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
