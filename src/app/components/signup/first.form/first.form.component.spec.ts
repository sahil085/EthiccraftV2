import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { First.FormComponent } from './first.form.component';

describe('First.FormComponent', () => {
  let component: First.FormComponent;
  let fixture: ComponentFixture<First.FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ First.FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(First.FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
