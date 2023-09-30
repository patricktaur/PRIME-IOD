import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmStudyMembersBaseComponent } from './dm-study-members-base.component';

describe('DmStudyMembersBaseComponent', () => {
  let component: DmStudyMembersBaseComponent;
  let fixture: ComponentFixture<DmStudyMembersBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmStudyMembersBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DmStudyMembersBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
