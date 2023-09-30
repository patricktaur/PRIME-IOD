import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFileUploadComponent } from './ngx-file-upload.component';

describe('NgxFileUploadComponent', () => {
  let component: NgxFileUploadComponent;
  let fixture: ComponentFixture<NgxFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxFileUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
