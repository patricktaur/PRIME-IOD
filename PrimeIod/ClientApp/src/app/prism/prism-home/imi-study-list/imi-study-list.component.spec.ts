import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiStudyListComponent } from './imi-study-list.component';

describe('ImiStudyListComponent', () => {
  let component: ImiStudyListComponent;
  let fixture: ComponentFixture<ImiStudyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiStudyListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiStudyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
