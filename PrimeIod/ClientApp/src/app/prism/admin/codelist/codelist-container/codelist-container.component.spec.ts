import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelistContainerComponent } from './codelist-container.component';

describe('CodelistContainerComponent', () => {
  let component: CodelistContainerComponent;
  let fixture: ComponentFixture<CodelistContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodelistContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodelistContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
