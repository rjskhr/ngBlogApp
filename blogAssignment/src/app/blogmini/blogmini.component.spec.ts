import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogminiComponent } from './blogmini.component';

describe('BlogminiComponent', () => {
  let component: BlogminiComponent;
  let fixture: ComponentFixture<BlogminiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogminiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogminiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
