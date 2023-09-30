import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdcstudystatusBySystemComponent } from './edcstudystatus-by-system.component';

describe('EdcstudystatusBySystemComponent', () => {
  let component: EdcstudystatusBySystemComponent;
  let fixture: ComponentFixture<EdcstudystatusBySystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdcstudystatusBySystemComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdcstudystatusBySystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
