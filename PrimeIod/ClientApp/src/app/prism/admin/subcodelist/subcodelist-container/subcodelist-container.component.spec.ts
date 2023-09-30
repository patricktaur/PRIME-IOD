import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcodelistContainerComponent } from './subcodelist-container.component';

describe('SubcodelistContainerComponent', () => {
  let component: SubcodelistContainerComponent;
  let fixture: ComponentFixture<SubcodelistContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubcodelistContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcodelistContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
