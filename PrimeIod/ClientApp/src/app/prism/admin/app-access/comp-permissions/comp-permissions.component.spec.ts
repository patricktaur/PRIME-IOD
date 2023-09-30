import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompPermissionsComponent } from './comp-permissions.component';

describe('CompPermissionsComponent', () => {
  let component: CompPermissionsComponent;
  let fixture: ComponentFixture<CompPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompPermissionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
