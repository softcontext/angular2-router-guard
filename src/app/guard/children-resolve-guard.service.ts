import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Children, ChildrenService } from './children.service';

@Injectable()
export class ChildrenResolveGuardService implements Resolve<Children> {
  constructor(private cs: ChildrenService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Children> {
    console.log('ChildrenResolveGuardService.resolve() called');

    let id = +route.params['id'];

    return this.cs.findById(id).then(children => {
      if (children) {
        return children;
      } else { // id not found
        this.router.navigate(['/not-found']);
        return null;
      }
    });
  }

}
