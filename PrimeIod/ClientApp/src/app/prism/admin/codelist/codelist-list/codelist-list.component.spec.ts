import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelistListComponent } from './codelist-list.component';

describe('CodelistListComponent', () => {
  let component: CodelistListComponent;
  let fixture: ComponentFixture<CodelistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodelistListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodelistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
