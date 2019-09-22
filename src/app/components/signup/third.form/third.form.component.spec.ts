import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Third.FormComponent } from './third.form.component';

describe('Third.FormComponent', () => {
  let component: Third.FormComponent;
  let fixture: ComponentFixture<Third.FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Third.FormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Third.FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
