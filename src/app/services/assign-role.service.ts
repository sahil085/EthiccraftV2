import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommonResponse} from '../models/common-response';
import {UserRoleCollegeMappingDTO} from '../models/UserRoleCollegeMappingDTO';
import {UserRoleCollegeMapping} from '../models/UserRoleCollegeMapping';

@Injectable({
  providedIn: 'root'
})
export class AssignRoleService {


  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getAllRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/member/roles`);
  }

  public getAllEmails(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/member/findAllEmail`);
  }

  public assignRole(userRoleCO): Observable<CommonResponse> {
    return this.http.put<CommonResponse>(`${this.apiUrl}/user/assignRole`, userRoleCO);
  }

  public findAllUserRole(): Observable<UserRoleCollegeMappingDTO[]> {
    return this.http.get<UserRoleCollegeMappingDTO[]>(`${this.apiUrl}/user/findAllUserRole`);
  }

  public deleteUserRole(id): Observable<CommonResponse> {
    return this.http.delete<CommonResponse>(`${this.apiUrl}/user/deleteRole/${id}`);
  }

  public findUserRoleById(id): Observable<UserRoleCollegeMapping> {
    return this.http.get<UserRoleCollegeMapping>(`${this.apiUrl}/user/userRoleById/${id}`);
  }

  public updateUserRoleCollegeMapping(userRoleCO): Observable<CommonResponse> {
    return this.http.put<CommonResponse>(`${this.apiUrl}/user/updateUserRole`, userRoleCO);
  }
}
