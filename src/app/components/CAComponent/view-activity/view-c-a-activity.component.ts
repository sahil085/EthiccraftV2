import { Component, OnInit } from '@angular/core';
import {Activity} from '../../../models/activity';
import {AppComponent} from '../../../app.component';
import {ActivityService} from '../../../services/admin/activity.service';
declare let $: any;

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-c-a-activity.component.html',
  styleUrls: ['./view-c-a-activity.component.css']
})
export class ViewCAActivityComponent implements OnInit {

  activityList: Activity[];

  constructor( public activityService: ActivityService) { }

  ngOnInit() {

  }

  findAllCAActivities() {
    this.activityService.findAllCAActivity().subscribe(
      (data) => {
        this.activityList = data;
      }
      ,
      err => {
        // AppComponent.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');
      }
    );
  }


}
