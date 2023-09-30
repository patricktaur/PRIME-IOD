import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsValTaskListComponent } from './cds-val-task-list.component';

describe('CdsValTaskListComponent', () => {
  let component: CdsValTaskListComponent;
  let fixture: ComponentFixture<CdsValTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdsValTaskListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdsValTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
