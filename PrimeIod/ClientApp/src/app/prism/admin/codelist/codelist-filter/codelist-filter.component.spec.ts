import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelistFilterComponent } from './codelist-filter.component';

describe('CodelistFilterComponent', () => {
  let component: CodelistFilterComponent;
  let fixture: ComponentFixture<CodelistFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodelistFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodelistFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
