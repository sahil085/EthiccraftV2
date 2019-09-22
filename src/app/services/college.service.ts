import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {College} from '../models/college';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  collegeApiUrl = `${environment.apiUrl}/college`;

  constructor(private http: HttpClient) { }

  public registerCollege(collegeCO) {
    console.log(collegeCO);
    return this.http.post(`${this.collegeApiUrl}/register`, collegeCO);
  }

  public findCollegeDropDown(): Observable<College[]> {
    return this.http.get<College[]>(`${this.collegeApiUrl}/collegeDropDown`);
  }

  public findCollegeById(collegeId: string): Observable<College> {
    return this.http.get<College>(`${this.collegeApiUrl}/${collegeId}`);
  }

  public findAllColleges(): Observable<College[]> {
    return this.http.get<College[]>(`${this.collegeApiUrl}/`);
  }

  public updateCollegeInfo(collegeId, college): Observable<any> {
    return  this.http.put<any>(`${this.collegeApiUrl}/${collegeId}`, college);
  }
}
