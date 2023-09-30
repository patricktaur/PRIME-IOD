import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiTimelinesListComponent } from './imi-timelines-list.component';

describe('ImiTimelinesListComponent', () => {
  let component: ImiTimelinesListComponent;
  let fixture: ComponentFixture<ImiTimelinesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiTimelinesListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiTimelinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
