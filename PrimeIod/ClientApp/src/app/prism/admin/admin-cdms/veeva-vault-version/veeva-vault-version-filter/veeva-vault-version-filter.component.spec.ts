import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeevaVaultVersionFilterComponent } from './veeva-vault-version-filter.component';

describe('VeevaVaultVersionFilterComponent', () => {
  let component: VeevaVaultVersionFilterComponent;
  let fixture: ComponentFixture<VeevaVaultVersionFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VeevaVaultVersionFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeevaVaultVersionFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
