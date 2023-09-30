import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossFunctionalViewComponent } from './cross-functional-view.component';

describe('CrossFunctionalViewComponent', () => {
  let component: CrossFunctionalViewComponent;
  let fixture: ComponentFixture<CrossFunctionalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossFunctionalViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrossFunctionalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
