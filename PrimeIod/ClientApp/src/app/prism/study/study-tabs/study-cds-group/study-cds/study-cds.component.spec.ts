import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyCdsComponent } from './study-cds.component';

describe('StudyCdsComponent', () => {
  let component: StudyCdsComponent;
  let fixture: ComponentFixture<StudyCdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyCdsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyCdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
