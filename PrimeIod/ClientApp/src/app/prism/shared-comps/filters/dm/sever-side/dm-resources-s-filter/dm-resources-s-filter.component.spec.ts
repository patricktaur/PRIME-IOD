import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmResourcesSFilterComponent } from './dm-resources-s-filter.component';

describe('DmResourcesSFilterComponent', () => {
  let component: DmResourcesSFilterComponent;
  let fixture: ComponentFixture<DmResourcesSFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmResourcesSFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmResourcesSFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
