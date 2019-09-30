import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { environment } from '../../../environments/environment';
import { ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OpenIdConnectService {

  private userManager: UserManager = new UserManager(environment.openIdConnectSettings);

  private currentUser: User;

  userLoaded$ = new ReplaySubject<boolean>(1);  //userLoaded可得知用戶登入成功 或 登出成功 (命名規範習慣符號結尾)待釐清  影片: 11:30 念一個objarulble  聽不懂 fuck!!

  get userAvailable(): boolean {
    return this.currentUser != null;
  }

  get user(): User {
    return this.currentUser;
  }

  constructor() {
    this.userManager.clearStaleState();  //先清空現行狀態

    //用戶登入成功就會進來一個User
    this.userManager.events.addUserLoaded(user => {
      if (!environment.production) {
        console.log('User loaded.', user);
      }
      this.currentUser = user;
      this.userLoaded$.next(true);  //廣播一下告知系統 User已經登入
    });

    this.userManager.events.addUserUnloaded((e) => {
      if (!environment.production) {
        console.log('User unloaded');
      }
      this.currentUser = null;
      this.userLoaded$.next(false); //廣播一下告知系統 User已經登出
    });
  }

  //登入頁面
  triggerSignIn() {
    this.userManager.signinRedirect().then(() => {
      if (!environment.production) {
        console.log('Redirection to signin triggered.');
      }
    });
  }

  //登入成功後要做的事情
  handleCallback() {
    this.userManager.signinRedirectCallback().then(user => {
      if (!environment.production) {
        console.log('Callback after signin handled.', user);
      }
    });
  }

  //重整的時候要做的事情
  handleSilentCallback() {
    this.userManager.signinSilentCallback().then(user => {
      this.currentUser = user;
      if (!environment.production) {
        console.log('Callback after silent signin handled.', user);
      }
    });
  }

  //登出頁面
  triggerSignOut() {
    this.userManager.signoutRedirect().then(resp => {
      if (!environment.production) {
        console.log('Redirection to sign out triggered.', resp);
      }
    });
  }
}
