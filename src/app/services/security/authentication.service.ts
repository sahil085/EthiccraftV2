import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AppUrl} from '../../constants/AppUrl';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient, private router: Router) {
  }


  authenticate(username, password) {
    return this.httpClient.post<any>(`${this.apiUrl}/authenticate`, {username, password}).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          const tokenStr = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', tokenStr);
          return userData;
        }
      )
    );
  }


  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    // console.log(!(user === null))
    return !(user === null);
  }


  logOut() {
    sessionStorage.removeItem('username');
    this.router.navigate([AppUrl.LOGIN]);
  }
}
