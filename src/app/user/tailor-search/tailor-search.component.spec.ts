import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorSearchComponent } from './tailor-search.component';

describe('TailorSearchComponent', () => {
  let component: TailorSearchComponent;
  let fixture: ComponentFixture<TailorSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TailorSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TailorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
