import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppComponent} from '../../../app.component';
import {ActivityService} from '../../../services/admin/activity.service';

@Component({
  selector: 'app-request-activity',
  templateUrl: './request-activity.component.html',
  styleUrls: ['./request-activity.component.css']
})
export class RequestActivityComponent implements OnInit {

  public requestActivityForm: FormGroup;

  name: string;
  description: string;
  type: string;
  colleges: number[];
  startDate: string;
  endDate: string;

  constructor(public fb: FormBuilder, public activityService: ActivityService) { }

  ngOnInit() {

    this.requestActivityForm = this.fb.group({
      name: [this.name, Validators.required],
      description: [this.description, Validators.required],
      type: [this.type, Validators.required],
      startDate: [this.startDate],
      endDate: [this.endDate],
      colleges: [this.colleges, Validators.required]
    });

  }

  request() {
    console.log(this.requestActivityForm.value);
    if (this.requestActivityForm.valid) {
      this.activityService.createActivity(this.requestActivityForm.value).subscribe(
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
