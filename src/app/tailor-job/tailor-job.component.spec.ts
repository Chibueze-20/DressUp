import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorJobComponent } from './tailor-job.component';

describe('TailorJobComponent', () => {
  let component: TailorJobComponent;
  let fixture: ComponentFixture<TailorJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TailorJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TailorJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
