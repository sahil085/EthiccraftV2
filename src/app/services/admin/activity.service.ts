import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommonResponse} from '../../models/common-response';
import {Activity} from '../../models/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {


  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createActivity(activityCO): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(`${this.apiUrl}/admin/activity/create`, activityCO);
  }

  updateActivity(activityCO): Observable<CommonResponse> {
    return this.http.put<CommonResponse>(`${this.apiUrl}/admin/activity/create`, activityCO);
  }

  findById(id): Observable<Activity> {
    return this.http.get<Activity>(`${this.apiUrl}/admin/activity/findById/${id}`);
  }

  findAllActivityByStatus(isApproved): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/admin/activity/findAllApprovedActivity/${isApproved}`);
  }

  findAll(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/admin/activity/findAll`);
  }

  deleteActivity(id): Observable<CommonResponse> {
    return this.http.delete<CommonResponse>(`${this.apiUrl}/admin/activity/delete/${id}`);
  }

  //// CA ////

  requestActivity(requestActivityCO): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(`${this.apiUrl}/ca/activity/request`, requestActivityCO);
  }

  editCAActivity(editActivityFormCO): Observable<CommonResponse> {
    return this.http.put<CommonResponse>(`${this.apiUrl}/ca/activity/edit`, editActivityFormCO);
  }

  findAllCAActivity(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/ca/activity/findAll`);
  }

}
