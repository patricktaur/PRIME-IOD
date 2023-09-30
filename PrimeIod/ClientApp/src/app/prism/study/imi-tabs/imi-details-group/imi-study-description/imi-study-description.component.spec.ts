import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiStudyDescriptionComponent } from './imi-study-description.component';

describe('ImiStudyDescriptionComponent', () => {
  let component: ImiStudyDescriptionComponent;
  let fixture: ComponentFixture<ImiStudyDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiStudyDescriptionComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiStudyDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
