import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsBatchActionsComponent } from './cds-batch-actions.component';

describe('CdsBatchActionsComponent', () => {
  let component: CdsBatchActionsComponent;
  let fixture: ComponentFixture<CdsBatchActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsBatchActionsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsBatchActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
