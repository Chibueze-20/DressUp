import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidViewComponent } from './bid-view.component';

describe('BidViewComponent', () => {
  let component: BidViewComponent;
  let fixture: ComponentFixture<BidViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
