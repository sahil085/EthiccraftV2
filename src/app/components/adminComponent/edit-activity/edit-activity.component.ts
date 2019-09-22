import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {College} from '../../../models/college';
import {AppComponent} from '../../../app.component';
import {ActivityService} from '../../../services/admin/activity.service';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {

  activityId: number;
  editActivityForm: FormGroup;
  name: string;
  description: string;
  type: string;
  colleges: number[];
  startDate: string;
  endDate: string;
  collegeDropDownList: College[];

  constructor(public fb: FormBuilder, private route: ActivatedRoute, public activityService: ActivityService) {
    this.route.params.subscribe(params => {
      this.activityId = params.id;
    });
  }

  ngOnInit() {

    this.editActivityForm = this.fb.group({
      name: [this.name, Validators.required],
      description: [this.description, Validators.required],
      type: [this.type, Validators.required],
      startDate: [this.startDate],
      endDate: [this.endDate],
      colleges: [this.colleges, Validators.required]
    });

  }

  findById() {
    this.activityService.findById(this.activityId).subscribe(
      (data) => {
       this.editActivityForm.patchValue(data);
      }
      ,
      err => {
          // AppComponent.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');
      }
    );
  }

  edit() {
    console.log(this.editActivityForm.value);

    if (this.editActivityForm.valid) {
      this.activityService.updateActivity(this.editActivityForm.value).subscribe(
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

  showToaster = (message, type) => {
    // Swal({
    //   title: message,
    //   type: type,
    //   timer: 1500
    // });
  }

}
