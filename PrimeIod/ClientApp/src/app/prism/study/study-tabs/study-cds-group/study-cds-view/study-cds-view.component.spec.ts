import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdsViewComponent } from './study-cds-view.component';

describe('StudyCdsViewComponent', () => {
  let component: StudyCdsViewComponent;
  let fixture: ComponentFixture<StudyCdsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyCdsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyCdsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
