import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateftesContainerComponent } from './generateftes-container.component';

describe('GenerateftesContainerComponent', () => {
  let component: GenerateftesContainerComponent;
  let fixture: ComponentFixture<GenerateftesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateftesContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateftesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
