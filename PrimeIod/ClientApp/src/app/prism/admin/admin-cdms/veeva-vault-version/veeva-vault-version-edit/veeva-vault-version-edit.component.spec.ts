import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeevaVaultVersionEditComponent } from './veeva-vault-version-edit.component';

describe('VeevaVaultVersionEditComponent', () => {
  let component: VeevaVaultVersionEditComponent;
  let fixture: ComponentFixture<VeevaVaultVersionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VeevaVaultVersionEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeevaVaultVersionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
