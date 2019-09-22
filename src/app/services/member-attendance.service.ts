import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommonResponse} from '../models/common-response';
import {MemberAttendance} from '../models/member-attendance';

@Injectable({
  providedIn: 'root'
})
export class MemberAttendanceService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }


  markAttendance(attendanceState): Observable<MemberAttendance> {
    return this.http.put<MemberAttendance>(`${this.apiUrl}/ca/member/markAttendance`, attendanceState);
  }

}
