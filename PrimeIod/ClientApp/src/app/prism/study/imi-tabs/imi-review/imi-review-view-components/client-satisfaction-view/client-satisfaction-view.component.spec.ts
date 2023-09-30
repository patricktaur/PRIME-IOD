import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSatisfactionViewComponent } from './client-satisfaction-view.component';

describe('ClientSatisfactionViewComponent', () => {
  let component: ClientSatisfactionViewComponent;
  let fixture: ComponentFixture<ClientSatisfactionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSatisfactionViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientSatisfactionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
