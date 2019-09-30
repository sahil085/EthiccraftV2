import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Member} from '../models/member';
import {MemberAttendance} from '../models/member-attendance';
import {CommonResponse} from '../models/common-response';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  findAllPendingMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.apiUrl}/member/pending-members/${UserService.getCurrentRole()}`);
  }
   findAll(): Observable<Member[]> {
     return this.http.get<Member[]>(`${this.apiUrl}/member/findAll/${UserService.getCurrentRole()}`);
   }

   quickRegister(membershipFormCO): Observable<CommonResponse> {
    return this.http.post<CommonResponse>(`${this.apiUrl}/member/quick-register`, membershipFormCO);
   }
  findAttendanceAllMembersOfCA(): Observable<MemberAttendance[]> {
    return this.http.get<MemberAttendance[]>(`${this.apiUrl}/ca/member/findAll`);
  }

  approveOrDecline(memberId, approveStatus): Observable<CommonResponse> {
    return this.http.put<CommonResponse>(`${this.apiUrl}/member/approveOrDecline/${memberId}/${approveStatus}`, null);
  }
}
