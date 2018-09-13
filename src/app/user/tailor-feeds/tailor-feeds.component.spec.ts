import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorFeedsComponent } from './tailor-feeds.component';

describe('TailorFeedsComponent', () => {
  let component: TailorFeedsComponent;
  let fixture: ComponentFixture<TailorFeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TailorFeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TailorFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
