import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot,
  RouterStateSnapshot, CanActivateChild,
  NavigationExtras, CanLoad, Route } from '@angular/router';

import { AuthService } from './auth.service';

/*
  CanActivate : 라우트 접근 권한을 체크하는 가드
  CanActivateChild : 자식 라우트 접근 권한을 체크하는 가드
  CanDeative : 저장되지 않은 상태를 버릴지 결정, 라우트가 비 활성화 될 때 기동
  Resolve : 라우트 데이터를 컴포넌트에게 제공
  CanLoad : 레이지 모듈을 임포트할 때 기동
 */
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    // 접근 권한을 체크(로그인 여부)
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;

    if(window.confirm("자식 라우트가 모두 로드 되었습니다. 진행하시겠습니까?")){
      return this.checkLogin(url);
    }else{
      return false;
    }
  }

  checkLogin(url: string): boolean {

    if (this.authService.isLogin) { return true; }

    this.authService.redirectUrl = url;
    let sessionId = 1234;

    let navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'anchor'
    };

    this.router.navigate(['/login'], navigationExtras);
    return false;
  }
}
