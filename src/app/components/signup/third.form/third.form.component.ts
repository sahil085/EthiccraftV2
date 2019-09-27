import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
  newCollegeEntry: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  validateForm = () => {
    if (this.thirdFormGroup.invalid) {
      this.thirdFormGroup.markAllAsTouched();
    }
  }

  setOtherCollege(value) {
    console.log(value);
    this.newCollegeEntry = value.id === 0;
    if (this.newCollegeEntry) {
      this.thirdFormGroup.get('unregisteredCollege').enable();
      this.thirdFormGroup.get('unregisteredCollege').setValue(value.unregisteredCollege);
    } else {
      this.thirdFormGroup.get('unregisteredCollege').disable();
    }
  }

  addCustomCollege = (term) => ({
    id: 0,
    unregisteredCollege: term,
    collegeName: term
  })

}
