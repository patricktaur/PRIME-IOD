import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiStudyEditComponent } from './imi-study-edit.component';

describe('ImiStudyEditComponent', () => {
  let component: ImiStudyEditComponent;
  let fixture: ComponentFixture<ImiStudyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImiStudyEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImiStudyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
