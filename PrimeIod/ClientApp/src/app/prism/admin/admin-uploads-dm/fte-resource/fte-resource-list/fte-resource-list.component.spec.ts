import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FteResourceListComponent } from './fte-resource-list.component';

describe('FteResourceListComponent', () => {
  let component: FteResourceListComponent;
  let fixture: ComponentFixture<FteResourceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FteResourceListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FteResourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
