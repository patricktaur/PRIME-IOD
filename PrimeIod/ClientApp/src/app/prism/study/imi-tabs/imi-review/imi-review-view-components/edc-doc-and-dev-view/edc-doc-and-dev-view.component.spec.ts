import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdcDocAndDevViewComponent } from './edc-doc-and-dev-view.component';

describe('EdcDocAndDevViewComponent', () => {
  let component: EdcDocAndDevViewComponent;
  let fixture: ComponentFixture<EdcDocAndDevViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdcDocAndDevViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdcDocAndDevViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
