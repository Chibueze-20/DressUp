import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestNotificationsComponent } from './request-notifications.component';

describe('BidNotificationsComponent', () => {
  let component: RequestNotificationsComponent;
  let fixture: ComponentFixture<RequestNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
