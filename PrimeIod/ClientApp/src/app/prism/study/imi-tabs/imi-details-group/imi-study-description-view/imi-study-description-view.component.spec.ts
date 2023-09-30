import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiStudyDescriptionViewComponent } from './imi-study-description-view.component';

describe('ImiStudyDescriptionViewComponent', () => {
  let component: ImiStudyDescriptionViewComponent;
  let fixture: ComponentFixture<ImiStudyDescriptionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImiStudyDescriptionViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImiStudyDescriptionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
