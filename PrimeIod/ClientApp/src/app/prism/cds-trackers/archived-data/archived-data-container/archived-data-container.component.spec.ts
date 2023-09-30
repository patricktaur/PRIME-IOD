import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedDataContainerComponent } from './archived-data-container.component';

describe('ArchivedDataContainerComponent', () => {
  let component: ArchivedDataContainerComponent;
  let fixture: ComponentFixture<ArchivedDataContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedDataContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivedDataContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
