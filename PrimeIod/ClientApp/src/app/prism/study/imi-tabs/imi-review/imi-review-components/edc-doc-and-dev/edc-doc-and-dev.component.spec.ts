import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdcDocAndDevComponent } from './edc-doc-and-dev.component';

describe('EdcDocAndDevComponent', () => {
  let component: EdcDocAndDevComponent;
  let fixture: ComponentFixture<EdcDocAndDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdcDocAndDevComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdcDocAndDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
