import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlEditorTypeComponent } from './html-editor-type.component';

describe('HtmlEditorTypeComponent', () => {
  let component: HtmlEditorTypeComponent;
  let fixture: ComponentFixture<HtmlEditorTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtmlEditorTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtmlEditorTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
