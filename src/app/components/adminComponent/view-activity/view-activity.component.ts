import { Component, OnInit } from '@angular/core';
import {Activity} from '../../../models/activity';
import {AppComponent} from '../../../app.component';
import {ActivityService} from '../../../services/admin/activity.service';
declare let $: any;
@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.css']
})
export class ViewActivityComponent implements OnInit {

  activityList: Activity[];

  constructor( public activityService: ActivityService) { }

  ngOnInit() {
    $('#viewActivityTable').DataTable({
      dom: '<\'row\'<\'col-sm-2\'l><\'col-sm-5\'B><\'col-sm-5\'f>>' +
        '<\'row\'<\'col-sm-12\'tr>>' +
        '<\'row\'<\'col-sm-5\'i><\'col-sm-7\'p>>',
      lengthMenu: [
        [ 10, 25, 50, -1 ],
        [ '10', '25', '50', 'Show all' ]
      ],

      buttons: [
        {
          extend: 'excel',
          exportOptions: {
            columns: [ 0, 1, 2, 3, 4, 5 ]
          }
        }
      ]
    });
  }

  findAllActivity() {
    this.activityService.findAll().subscribe(
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
