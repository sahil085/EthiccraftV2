import {Component, OnInit, TemplateRef} from '@angular/core';
import {AssignRoleService} from '../../../services/assign-role.service';
import {CollegeService} from '../../../services/college.service';
import {Router} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {College} from '../../../models/college';
import {UserRoleCollegeMappingDTO} from '../../../models/UserRoleCollegeMappingDTO';
import {UserRoleCollegeMapping} from '../../../models/UserRoleCollegeMapping';
import {AppComponent} from '../../../app.component';
import {Role} from '../../../constants/Role';
import {Constant} from '../../../constants';
import alert from 'sweetalert2';

@Component({
  selector: 'app-view-assign-role-action',
  templateUrl: './view-assign-role-action.component.html',
  styleUrls: ['./view-assign-role-action.component.scss']
})
export class ViewAssignRoleActionComponent {

   params: any;
  collegeList: College[] = [];
  userRoleCollegeMappingList: UserRoleCollegeMappingDTO[] = [];
  userRoleCollegeMapping: UserRoleCollegeMapping;
  updateColleges: any = [];
  roleCA = Role.userRoles.CAMPUS_AMBASSADOR;
  constructor(private roleService: AssignRoleService,
              private collegeService: CollegeService, private dialogService: NbDialogService) { }

  agInit(params: any): void {
    this.params = params;
  }

  fetchActiveCollege = () => {
    this.collegeService.findCollegeDropDown().subscribe(
      data => {
        this.collegeList = data;
      }
    );
  }

  refresh(): boolean {
    return false;
  }

  editUserRoleCollegeMapping(dialog: TemplateRef<any>) {
    const rowData = this.params;
    this.fetchActiveCollege();
    this.roleService.findUserRoleById(rowData.data.id).subscribe(data => {
      this.userRoleCollegeMapping = data;
      this.updateColleges = this.userRoleCollegeMapping.collegeList.map(data1 => data1.id);
    });

    this.dialogService.open(dialog, { context: rowData});
  }

  deleteUserRole = (rowData) => {

    alert.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete the user role ?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.roleService.deleteUserRole(rowData.data.id).subscribe(data => {
          if (data.successMessage !== null) {
            AppComponent.showToaster(data.successMessage, data.type);
            this.findAllUserRole(rowData);
          } else {
            AppComponent.showToaster(data.errorMessage, data.type);
          }
        });
      }

    });

  }


  update(rowData) {
    if (this.updateColleges.length > 0) {
      const userRoleCO = {
        id: this.userRoleCollegeMapping.id,
        username: this.userRoleCollegeMapping.user.email,
        role: this.userRoleCollegeMapping.role.role,
        colleges: this.updateColleges || []
      };
      this.roleService.updateUserRoleCollegeMapping(userRoleCO).subscribe(data => {
        if (data.successMessage !== null) {
          AppComponent.showToaster(data.successMessage, data.type);
          this.findAllUserRole(rowData);
        } else {
          AppComponent.showToaster(data.errorMessage, data.type);
        }
      });
    }
  }

  findAllUserRole = (rowData) => {
    this.roleService.findAllUserRole().subscribe(data => {
      this.userRoleCollegeMappingList = data;
      rowData.api.setRowData(this.userRoleCollegeMappingList);
    });
  }
}
