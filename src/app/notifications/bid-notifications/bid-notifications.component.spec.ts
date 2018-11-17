import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidNotificationsComponent } from './bid-notifications.component';

describe('BidNotificationsComponent', () => {
  let component: BidNotificationsComponent;
  let fixture: ComponentFixture<BidNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
