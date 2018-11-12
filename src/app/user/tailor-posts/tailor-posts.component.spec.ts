import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorPostsComponent } from './tailor-posts.component';

describe('TailorPostsComponent', () => {
  let component: TailorPostsComponent;
  let fixture: ComponentFixture<TailorPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TailorPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TailorPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
