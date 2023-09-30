import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelistEditComponent } from './codelist-edit.component';

describe('CodelistEditComponent', () => {
  let component: CodelistEditComponent;
  let fixture: ComponentFixture<CodelistEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodelistEditComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodelistEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
