import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAccessMembersComponent } from './group-access-members.component';

describe('GroupAccessMembersComponent', () => {
  let component: GroupAccessMembersComponent;
  let fixture: ComponentFixture<GroupAccessMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupAccessMembersComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAccessMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
