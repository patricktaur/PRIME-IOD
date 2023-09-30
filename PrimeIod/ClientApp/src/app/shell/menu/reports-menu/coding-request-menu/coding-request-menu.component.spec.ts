import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingRequestMenuComponent } from './coding-request-menu.component';

describe('CodingRequestMenuComponent', () => {
  let component: CodingRequestMenuComponent;
  let fixture: ComponentFixture<CodingRequestMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodingRequestMenuComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodingRequestMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
