import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  membershipForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.membershipForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      college: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]]
    });
  }

  register = () => {
    if (this.membershipForm.invalid) {
      this.membershipForm.markAllAsTouched();
    } else {
      console.log(this.membershipForm.value);
    }
  };

}
