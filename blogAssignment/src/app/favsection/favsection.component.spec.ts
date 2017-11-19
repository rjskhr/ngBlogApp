import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavsectionComponent } from './favsection.component';

describe('FavsectionComponent', () => {
  let component: FavsectionComponent;
  let fixture: ComponentFixture<FavsectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavsectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
