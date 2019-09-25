import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {DashboardComponent} from './components/pages/dashboard/dashboard.component';
import {PageComponent} from './components/pages/page/page.component';
import {AuthGuard} from './auth/auth.guard';
import {Role} from './constants/Role';
import {AccessDeniedComponent} from './components/access-denied/access-denied.component';
import {ChildAuthGuard} from './auth/child.guard';
import {CollegeRegistrationFormComponent} from './components/adminComponent/college-registration-form/college-registration-form.component';
import {AssignRoleComponent} from './components/adminComponent/assign-role/assign-role.component';
import {ViewActivityComponent} from './components/adminComponent/view-activity/view-activity.component';
import {CreateActivityComponent} from './components/adminComponent/create-activity/create-activity.component';
import {EditActivityComponent} from './components/adminComponent/edit-activity/edit-activity.component';
import {ViewCAMembersComponent} from './components/CAComponent/view-camembers/view-camembers.component';
import {EditCAActivityComponent} from './components/CAComponent/edit-caactivity/edit-caactivity.component';
import {MemberAttendanceCAComponent} from './components/CAComponent/member-attendance-ca/member-attendance-ca.component';
import {EditCollegeComponent} from './components/adminComponent/edit-college/edit-college.component';
import {ViewCollegeComponent} from './components/adminComponent/view-college/view-college.component';
import {PendingMembersComponent} from './components/pending-members/pending-members.component';
import {RequestActivityComponent} from './components/CAComponent/request-activity/request-activity.component';
import {ViewCAActivityComponent} from './components/CAComponent/view-activity/view-c-a-activity.component';
import {SignupComponent} from './components/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'page',
    pathMatch: 'full'
  },
  {
    path: 'page',
    component: PageComponent,
    canActivate: [AuthGuard],
    canActivateChild: [ChildAuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {roles: Role.getAllRoles()}
      },
      {
        path: 'membershipForm',
        component: RegisterComponent,
        data: {roles: Role.getAllRoles()}
      },
      {
        path: 'register',
        component: SignupComponent,
        data: {roles: Role.getAllRoles()}
      },
      {
        path: 'registerCollege',
        component: CollegeRegistrationFormComponent,
        data: {roles: [Role.userRoles.ADMIN]}
      },
      {
        path: 'assignRole',
        component: AssignRoleComponent,
        data: {roles: [Role.userRoles.ADMIN]}
      },
      {
        path: 'admin/activity/create',
        component: CreateActivityComponent,

        data: {roles: [Role.userRoles.ADMIN]}
      },
      {
        path: 'admin/activity/view',
        component: ViewActivityComponent,
        data: {roles: [Role.userRoles.ADMIN]}
      },
      {
        path: 'admin/activity/edit/:id',
        component: EditActivityComponent,
        data: {roles: [Role.userRoles.ADMIN]}
      },
      {
        path: 'ca/activity/request',
        component: RequestActivityComponent,
        data: {roles: [Role.userRoles.CAMPUS_AMBASSADOR]}
      },
      {
        path: 'ca/activity/view',
        component: ViewCAActivityComponent,
        data: {roles: [Role.userRoles.CAMPUS_AMBASSADOR]}
      },
      {
        path: 'ca/activity/edit/:id',
        component: EditCAActivityComponent,
        data: {roles: [Role.userRoles.CAMPUS_AMBASSADOR]}
      },
      {
        path: 'ca/member/view',
        component: ViewCAMembersComponent,
        data: {roles: [Role.userRoles.CAMPUS_AMBASSADOR]}
      },
      {
        path: 'ca/member/markAttendance/:activityId',
        component: MemberAttendanceCAComponent,
        data: {roles: [Role.userRoles.CAMPUS_AMBASSADOR]}
      },
      {
        path: 'admin/college/edit/:id',
        component: EditCollegeComponent,
        data: {roles: [Role.userRoles.ADMIN]}
      },
      {
        path: 'admin/college/view',
        component: ViewCollegeComponent,
        data: {roles: [Role.userRoles.ADMIN]}
      },
      {
        path: 'pending-members',
        component: PendingMembersComponent,
        data: {roles: [Role.userRoles.ADMIN, Role.userRoles.CAMPUS_AMBASSADOR]}
      }

    ]
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent

  },
  {
    path: 'register',
    component: SignupComponent
  }
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
