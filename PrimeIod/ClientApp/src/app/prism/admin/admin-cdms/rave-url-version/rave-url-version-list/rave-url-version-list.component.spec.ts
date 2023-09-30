import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaveUrlVersionListComponent } from './rave-url-version-list.component';

describe('RaveUrlVersionListComponent', () => {
  let component: RaveUrlVersionListComponent;
  let fixture: ComponentFixture<RaveUrlVersionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RaveUrlVersionListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaveUrlVersionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
