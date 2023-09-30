import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerResponseMessagesComponent } from './server-response-messages.component';

describe('ServerResponseMessagesComponent', () => {
  let component: ServerResponseMessagesComponent;
  let fixture: ComponentFixture<ServerResponseMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServerResponseMessagesComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerResponseMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
