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
    // this.clg.selectionModel[0].value
    this.newCollegeEntry = value === 'other';
    if (this.newCollegeEntry) {
      this.thirdFormGroup.get('unregisteredCollege').enable();
    } else {
      this.thirdFormGroup.get('unregisteredCollege').disable();
    }
  }

}
