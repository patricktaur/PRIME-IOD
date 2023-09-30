import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImiResourcesSFilterComponent } from './imi-resources-s-filter.component';

describe('ImiResourcesSFilterComponent', () => {
  let component: ImiResourcesSFilterComponent;
  let fixture: ComponentFixture<ImiResourcesSFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImiResourcesSFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImiResourcesSFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
