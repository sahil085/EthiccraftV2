import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  NbButtonModule, NbCardModule, NbContextMenuModule, NbDialogModule, NbIconModule, NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSelectModule,
  NbSidebarModule,
  NbStepperModule,
  NbThemeModule, NbToggleModule, NbUserModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HeaderComponent} from './components/pages/header/header.component';
import {FooterComponent} from './components/pages/footer/footer.component';
import {SideNavComponent} from './components/pages/side-nav/side-nav.component';
import {DashboardComponent} from './components/pages/dashboard/dashboard.component';
import {PageComponent} from './components/pages/page/page.component';
import {AccessDeniedComponent} from './components/access-denied/access-denied.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './components/adminComponent/home/home.component';
import {CollegeRegistrationFormComponent} from './components/adminComponent/college-registration-form/college-registration-form.component';
import {AssignRoleComponent} from './components/adminComponent/assign-role/assign-role.component';
import {CreateActivityComponent} from './components/adminComponent/create-activity/create-activity.component';
import {EditActivityComponent} from './components/adminComponent/edit-activity/edit-activity.component';
import {ViewActivityComponent} from './components/adminComponent/view-activity/view-activity.component';
import {ViewCAActivityComponent} from './components/CAComponent/view-activity/view-c-a-activity.component';
import {RequestActivityComponent} from './components/CAComponent/request-activity/request-activity.component';
import {EditCAActivityComponent} from './components/CAComponent/edit-caactivity/edit-caactivity.component';
import {ViewCAMembersComponent} from './components/CAComponent/view-camembers/view-camembers.component';
import {MemberAttendanceCAComponent} from './components/CAComponent/member-attendance-ca/member-attendance-ca.component';
import {EditCollegeComponent} from './components/adminComponent/edit-college/edit-college.component';
import {PendingMembersComponent} from './components/pending-members/pending-members.component';
import {KeysPipe} from './pipe/keys-pipe';
import {ViewCollegeComponent} from './components/adminComponent/view-college/view-college.component';
import {SignupComponent} from './components/signup/signup.component';
import {FirstFormComponent} from './components/signup/first.form/first.form.component';
import {SecondFormComponent} from './components/signup/second.form/second.form.component';
import {ThirdFormComponent} from './components/signup/third.form/third.form.component';
import {FourthFormComponent} from './components/signup/fourth.form/fourth.form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthHttpInterceptorService} from './services/security/auth-http-interceptor.service';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {NgSelectModule} from '@ng-select/ng-select';
import {AgGridModule} from 'ag-grid-angular';
import { ViewCollegeActionComponent } from './components/button-components/view-college-action/view-college-action.component';
import { NgxUiLoaderModule, NgxUiLoaderConfig, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule, POSITION, SPINNER } from 'ngx-ui-loader';
import { ViewPendingMemberActionComponent } from './components/button-components/view-pending-member-action/view-pending-member-action.component';
import { ViewAssignRoleActionComponent } from './components/button-components/view-assign-role-action/view-assign-role-action.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: '#00bf98',
  fgsPosition: POSITION.centerCenter,
  fgsSize: 60,
  fgsType: SPINNER.threeStrings,
  logoUrl: 'assets/img/ethiccraft.png',
  pbColor: '#00bf98'
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    PageComponent,
    AccessDeniedComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    CollegeRegistrationFormComponent,
    FirstFormComponent,
    SecondFormComponent,
    ThirdFormComponent,
    FourthFormComponent,
    FirstFormComponent,
    AssignRoleComponent,
    CreateActivityComponent,
    EditActivityComponent,
    ViewActivityComponent,
    ViewCAActivityComponent,
    RequestActivityComponent,
    EditCAActivityComponent,
    ViewCAMembersComponent,
    MemberAttendanceCAComponent,
    EditCollegeComponent,
    ViewCollegeComponent,
    KeysPipe,
    PendingMembersComponent,
    AccessDeniedComponent,
    DashboardComponent,
    ViewCollegeActionComponent,
    ViewPendingMemberActionComponent,
    ViewAssignRoleActionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbStepperModule,
    NbInputModule,
    NbSelectModule,
    NbCardModule,
    HttpClientModule,
    NbIconModule,
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NgSelectModule,
    NbUserModule,
    NbDialogModule.forRoot({}),
    AgGridModule.forRoot({}),
    NbContextMenuModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule.forRoot({showForeground: true}),
    NgxUiLoaderHttpModule.forRoot({showForeground: true}),
    NbToggleModule
  ],
  entryComponents: [
    ViewCollegeActionComponent,
    ViewPendingMemberActionComponent,
    ViewAssignRoleActionComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptorService,
    multi: true
  }, { provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
