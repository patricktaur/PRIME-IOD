import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsMenuComponent } from './cds-menu.component';

describe('CdsMenuComponent', () => {
  let component: CdsMenuComponent;
  let fixture: ComponentFixture<CdsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsMenuComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
