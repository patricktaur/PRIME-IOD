import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiProjRevCompListComponent } from './imi-proj-rev-comp-list.component';

describe('ImiProjRevCompListComponent', () => {
  let component: ImiProjRevCompListComponent;
  let fixture: ComponentFixture<ImiProjRevCompListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiProjRevCompListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiProjRevCompListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
