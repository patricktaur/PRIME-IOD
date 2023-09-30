import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdsOutputArchivedDataComponent } from './cds-output-archived-data.component';

describe('CdsOutputArchivedDataComponent', () => {
  let component: CdsOutputArchivedDataComponent;
  let fixture: ComponentFixture<CdsOutputArchivedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdsOutputArchivedDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdsOutputArchivedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
