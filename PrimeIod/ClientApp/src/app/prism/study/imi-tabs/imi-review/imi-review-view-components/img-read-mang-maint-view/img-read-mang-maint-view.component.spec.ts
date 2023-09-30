import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgReadMangMaintViewComponent } from './img-read-mang-maint-view.component';

describe('ImgReadMangMaintViewComponent', () => {
  let component: ImgReadMangMaintViewComponent;
  let fixture: ComponentFixture<ImgReadMangMaintViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgReadMangMaintViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgReadMangMaintViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
