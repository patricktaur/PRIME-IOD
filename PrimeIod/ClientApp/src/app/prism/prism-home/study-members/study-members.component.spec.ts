import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyMembersComponent } from './study-members.component';

describe('StudyMembersComponent', () => {
  let component: StudyMembersComponent;
  let fixture: ComponentFixture<StudyMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyMembersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
