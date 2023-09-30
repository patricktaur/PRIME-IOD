import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmMenuComponent } from './crm-menu.component';

describe('CrmMenuComponent', () => {
  let component: CrmMenuComponent;
  let fixture: ComponentFixture<CrmMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrmMenuComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
