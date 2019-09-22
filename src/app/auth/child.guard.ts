import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';


@Injectable({providedIn: 'root'})
export class ChildAuthGuard implements CanActivateChild {

  constructor(private router: Router) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentRole = 'ADMIN';
    // Check the user has permission or not to view the page
    if (childRoute.data.roles && childRoute.data.roles.indexOf(currentRole) === -1) {
      // role not authorised so redirect to Access denied page
      this.router.navigate(['/access-denied']);
      return false;
    }
    return true;
  }


}
