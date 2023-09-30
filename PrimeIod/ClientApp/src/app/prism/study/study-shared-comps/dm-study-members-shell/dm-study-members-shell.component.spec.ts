import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmStudyMembersShellComponent } from './dm-study-members-shell.component';

describe('DmStudyMembersShellComponent', () => {
  let component: DmStudyMembersShellComponent;
  let fixture: ComponentFixture<DmStudyMembersShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmStudyMembersShellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DmStudyMembersShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
