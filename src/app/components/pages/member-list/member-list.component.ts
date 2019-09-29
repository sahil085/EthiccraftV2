import { Component, OnInit } from '@angular/core';
import {ViewPendingMemberActionComponent} from '../../button-components/view-pending-member-action/view-pending-member-action.component';
import {Member} from '../../../models/member';
import {MemberService} from '../../../services/member.service';
import {AppComponent} from '../../../app.component';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  columnDefs: any;
  private gridApi;
  private gridColumnApi;
  membersList: Member[] = [];

  constructor(public memberService: MemberService) { }

  ngOnInit() {
    this.findAllPendingMembers();
    this.createGrid();
  }

  findAllPendingMembers() {
    this.memberService.findAll().subscribe(
      (data) => {
        this.membersList = data;
      }
      ,
      err => {
        AppComponent.showToaster(err['error'].message ? err['error'].message : err['error'].text, 'error');
      }
    );
  }

  createGrid() {
    this.columnDefs = [
      {
        headerName: 'Name', field: 'fullName',
        cellRenderer: function (params) {
          if (!params.data) {
            return '';
          } else {
            return params.data.firstName + ' ' + params.data.middleName + ' ' + params.data.lastName;
          }

        },
        sortable: true, filter: true
      },
      {headerName: 'Email ID', field: 'email', sortable: true, filter: true, resizable: true},
      {headerName: 'Mobile Number', field: 'mobileNumber', sortable: true, filter: true, resizable: true},
      {headerName: 'Course', field: 'courseName', sortable: true, filter: true, resizable: true},
      {headerName: 'Batch', field: 'batch', sortable: true, filter: true, resizable: true},
      {headerName: 'College', field: 'college.collegeName', sortable: true, filter: true, resizable: true},
      {headerName: 'Un-Registered College', field: 'unRegisteredCollege', sortable: true, filter: true, resizable: true}
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    params.api.setGridAutoHeight(true);

    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
        params.api.setGridAutoHeight(true);

      });
    });
  }

}
