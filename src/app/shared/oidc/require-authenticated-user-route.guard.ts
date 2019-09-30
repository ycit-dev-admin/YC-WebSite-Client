import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OpenIdConnectService } from './open-id-connect.service';

@Injectable({
  providedIn: 'root'
})
export class RequireAuthenticatedUserRouteGuard implements CanActivate {
  constructor(
    private openIdConnectService: OpenIdConnectService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.openIdConnectService.userAvailable) {
      return true;  //如果用戶是登入的就有權限看該頁面
    } else {
      // trigger signin
      this.openIdConnectService.triggerSignIn();   //沒權限就跳轉到Idp4 登入頁面
      return false; //如果用戶不是登入的狀態就是沒權限看該頁面
    }
  }
}
