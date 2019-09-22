import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Member} from '../../../models/member';
import {AppComponent} from '../../../app.component';
import {MemberAttendance} from '../../../models/member-attendance';
import {MemberAttendanceService} from '../../../services/member-attendance.service';
import {MemberService} from '../../../services/member.service';
declare let $: any;

@Component({
  selector: 'app-member-attendance-ca',
  templateUrl: './member-attendance-ca.component.html',
  styleUrls: ['./member-attendance-ca.component.css']
})
export class MemberAttendanceCAComponent implements OnInit {

  activityId: number;
  membersList: MemberAttendance[];

  constructor(private route: ActivatedRoute, public attendanceService: MemberAttendanceService, public memberService: MemberService) {
    this.route.params.subscribe(params => {
      this.activityId = params.activityId;
    });
  }

  ngOnInit() {

    $('#viewMemberAttendanceTable').DataTable({
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

  findAllMembersOfCA() {
    this.memberService.findAttendanceAllMembersOfCA().subscribe(
      (data) => {
        this.membersList = data;
      }
      ,
      err => {
        // AppComponent.showToaster(err.error.message ? err.error.message : err.error.text, 'error');
      }
    );
  }

  markAttendance(state, member) {
      this.attendanceService.markAttendance(state).subscribe(
        (data) => {
          member = data;
        }
        ,
        err => {
          // AppComponent.showToaster(err.error.message ? err.error.message : err.error.text, 'error');
        }
      );
  }

}
