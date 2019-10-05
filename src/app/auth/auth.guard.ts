import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/security/authentication.service';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.isUserLoggedIn();
    // If user hits login page then Redirect user to dashboard if already Logged in.
    // if (currentUser && state.url === '/login') {
    //   this.router.navigate(['page']);
    //   return true;
    // } else if (currentUser && state.url === '/register') {
    //   this.router.navigate(['page/register']);
    //   return true;
    // } else if (currentUser) {
    //   // Allow user to page if logged in
    //
    //   return true;
    // }
    return true;
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
  }
}
