import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgReadMangMaintComponent } from './img-read-mang-maint.component';

describe('ImgReadMangMaintComponent', () => {
  let component: ImgReadMangMaintComponent;
  let fixture: ComponentFixture<ImgReadMangMaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImgReadMangMaintComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgReadMangMaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
