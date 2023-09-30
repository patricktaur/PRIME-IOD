import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiRaBatchActionsComponent } from './imi-ra-batch-actions.component';

describe('ImiRaBatchActionsComponent', () => {
  let component: ImiRaBatchActionsComponent;
  let fixture: ComponentFixture<ImiRaBatchActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiRaBatchActionsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiRaBatchActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
