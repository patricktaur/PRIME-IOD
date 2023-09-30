import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyOfflineViewComponent } from './study-offline-ignore-view.component';

describe('StudyOfflineViewComponent', () => {
  let component: StudyOfflineViewComponent;
  let fixture: ComponentFixture<StudyOfflineViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyOfflineViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyOfflineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
