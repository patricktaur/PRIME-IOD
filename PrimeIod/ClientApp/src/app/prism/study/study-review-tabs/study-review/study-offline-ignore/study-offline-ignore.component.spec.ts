import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyOfflineIgnoreComponent } from './study-offline-ignore.component';

describe('StudyOfflineIgnoreComponent', () => {
  let component: StudyOfflineIgnoreComponent;
  let fixture: ComponentFixture<StudyOfflineIgnoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyOfflineIgnoreComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyOfflineIgnoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
