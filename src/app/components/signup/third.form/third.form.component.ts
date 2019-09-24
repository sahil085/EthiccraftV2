import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {KeyValue} from '@angular/common';
import {College} from '../../../models/college';

@Component({
  selector: 'app-third-form',
  templateUrl: './third.form.component.html',
  styleUrls: ['./third.form.component.css']
})
export class ThirdFormComponent implements OnInit {

  @Input() thirdFormGroup: FormGroup;
  @Input() collegeList: College[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  validateForm = () => {
    if (this.thirdFormGroup.invalid) {
      this.thirdFormGroup.markAllAsTouched();
    }
  };

}
