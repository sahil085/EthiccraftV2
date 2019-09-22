import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AppComponent} from '../../../app.component';
import {ActivityService} from '../../../services/admin/activity.service';

@Component({
  selector: 'app-edit-caactivity',
  templateUrl: './edit-caactivity.component.html',
  styleUrls: ['./edit-caactivity.component.css']
})
export class EditCAActivityComponent implements OnInit {

  public editActivityForm: FormGroup;

  name: string;
  description: string;
  type: string;
  colleges: number[];
  startDate: string;
  endDate: string;
  activityId: number;

  constructor(public fb: FormBuilder, private route: ActivatedRoute, public activityService: ActivityService) {
    this.route.params.subscribe(params => {
      this.activityId = params.id;
    });
  }

  ngOnInit() {

    this.editActivityForm = this.fb.group({
      startDate: [this.startDate],
      endDate: [this.endDate]
    });

  }
  findById() {
    this.activityService.findById(this.activityId).subscribe(
      (data) => {
        this.editActivityForm.patchValue(data);
      }
      ,
      err => {
        // AppComponent.showToaster(err.error.message ? err.error.message : err.error.text, 'error');
      }
    );
  }

}
