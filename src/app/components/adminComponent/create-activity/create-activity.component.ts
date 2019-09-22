import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {College} from '../../../models/college';
import {AppComponent} from '../../../app.component';
import {ActivityService} from '../../../services/admin/activity.service';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css']
})
export class CreateActivityComponent implements OnInit {

  public createActivityForm: FormGroup;

  name: string;
  description: string;
  type: string;
  colleges: number[];
  startDate: string;
  endDate: string;
  collegeDropDownList: College[];

  constructor(public fb: FormBuilder, public activityService: ActivityService) { }

  ngOnInit() {

    this.createActivityForm = this.fb.group({
      name: [this.name, Validators.required],
      description: [this.description, Validators.required],
      type: [this.type, Validators.required],
      startDate: [this.startDate],
      endDate: [this.endDate],
      colleges: [this.colleges, Validators.required]
    });

  }

  create() {
    console.log(this.createActivityForm.value);
    if (this.createActivityForm.valid) {
      this.activityService.createActivity(this.createActivityForm.value).subscribe(
        (data) => {
          if (data.errorMessage !== null) {
            // AppComponent.showToaster(data.errorMessage, 'error');
          } else {
            // AppComponent.showToaster(data.successMessage, 'success');
          }
        }
        ,
        err => {
          if (err.status === 400) {
            // AppComponent.showToaster('Validation failed', 'error');

          } else {
            // AppComponent.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');

          }
        }
      );
    }
  }


}
