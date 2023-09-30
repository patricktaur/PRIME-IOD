import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmCodelistListComponent } from './crm-codelist-list.component';

describe('CrmCodelistListComponent', () => {
  let component: CrmCodelistListComponent;
  let fixture: ComponentFixture<CrmCodelistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrmCodelistListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmCodelistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
