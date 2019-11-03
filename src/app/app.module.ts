import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { RequireAuthenticatedUserRouteGuard } from './shared/oidc/require-authenticated-user-route.guard';
import { SigninOidcComponent } from './shared/oidc/signin-oidc/signin-oidc.component';
import { RedirectSilentRenewComponent } from './shared/oidc/redirect-silent-renew/redirect-silent-renew.component';
import { OpenIdConnectService } from './shared/oidc/open-id-connect.service';
import { GlobalErrorHandler } from './shared/global-error-handler';
import { ErrorLoggerService } from './shared/error-logger.service';

const routes: Routes = [
  { path: 'yc', loadChildren: './yc/yc.module#YcModule' },
  { path: 'signin-oidc', component: SigninOidcComponent },
  { path: 'redirect-silentrenew', component: RedirectSilentRenewComponent },
  { path: '**', redirectTo: 'yc' }
];

// NgModule 為Ng的裝飾器，傳入裝飾器裡的物件，在 Angular 裡稱作中繼資料 （MetaData），用來告訴 Angular 要怎麼樣處理接下來的的類別
@NgModule({
  // 會將**可宣告(declarable)**的類別放在這個設定,樣板顯示有關的程式，都屬於這裡面的設定
  declarations: [
    AppComponent,
    SigninOidcComponent,
    RedirectSilentRenewComponent
  ],
  // 代表要使用哪些模組所提供的功能
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  // providers: [] 主要是用來決定哪些服務(service)允許被注入
  providers: [
    OpenIdConnectService,
    RequireAuthenticatedUserRouteGuard,   // 註冊guard的服務
    GlobalErrorHandler,
    ErrorLoggerService
  ],
  // bootstrap : [] 裡面的元件會自動被啟動，放在 bootstrap: [] 中的元件，會自動被視為放入 entryComponents: [] 之中。
  bootstrap: [AppComponent]
})
export class AppModule { }
