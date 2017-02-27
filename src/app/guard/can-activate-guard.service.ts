import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

export class UserToken { }
export class Permissions {
  canActivate(user: UserToken, params: any): boolean {
    return true;
  }
}

@Injectable()
export class CanActivateGuardService implements CanActivate {
  constructor(private permissions: Permissions, private currentUser: UserToken) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let url: string = state.url;
    console.log('CanActivateGuardService.canActivate() called');
    console.log(url);
    console.log(route.params);

    return this.permissions.canActivate(this.currentUser, route.params);
  }

}
