import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportaccessrightsContainerComponent } from './reportaccessrights-container.component';

describe('ReportaccessrightsContainerComponent', () => {
  let component: ReportaccessrightsContainerComponent;
  let fixture: ComponentFixture<ReportaccessrightsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportaccessrightsContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportaccessrightsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
