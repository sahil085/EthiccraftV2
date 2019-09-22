import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Fourth.FormComponent } from './fourth.form.component';

describe('Fourth.FormComponent', () => {
  let component: Fourth.FormComponent;
  let fixture: ComponentFixture<Fourth.FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Fourth.FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Fourth.FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
