import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeevaVaultVersionListComponent } from './veeva-vault-version-list.component';

describe('VeevaVaultVersionListComponent', () => {
  let component: VeevaVaultVersionListComponent;
  let fixture: ComponentFixture<VeevaVaultVersionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VeevaVaultVersionListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeevaVaultVersionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
