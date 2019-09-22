import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public signUp(membershipFormCO) {
    return this.http.post(`${this.apiUrl}/member/register`, membershipFormCO);
  }
}
