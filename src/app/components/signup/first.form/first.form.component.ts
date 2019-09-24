import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-first-form',
  templateUrl: './first.form.component.html',
  styleUrls: ['./first.form.component.css']
})
export class FirstFormComponent implements OnInit {

  @Input() firstFormGroup: FormGroup;

  constructor() {
  }

  ngOnInit() {

  }

  validateForm = () => {
    if (this.firstFormGroup.invalid) {
      console.log('hello', this.firstFormGroup.invalid);
      this.firstFormGroup.markAllAsTouched();
    }
    console.log(this.firstFormGroup.value);
  }

}
