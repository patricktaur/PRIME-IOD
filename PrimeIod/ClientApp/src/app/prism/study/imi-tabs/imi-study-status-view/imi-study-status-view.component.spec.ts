import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiStudyStatusViewComponent } from './imi-study-status-view.component';

describe('ImiStudyStatusViewComponent', () => {
  let component: ImiStudyStatusViewComponent;
  let fixture: ComponentFixture<ImiStudyStatusViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImiStudyStatusViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImiStudyStatusViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
