import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodelistRequestsContainerComponent } from './codelist-requests-container.component';

describe('CodelistRequestsContainerComponent', () => {
  let component: CodelistRequestsContainerComponent;
  let fixture: ComponentFixture<CodelistRequestsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodelistRequestsContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodelistRequestsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
