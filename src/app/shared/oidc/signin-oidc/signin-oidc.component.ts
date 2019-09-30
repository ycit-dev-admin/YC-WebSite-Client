import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpenIdConnectService } from '../open-id-connect.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-signin-oidc',
  templateUrl: './signin-oidc.component.html',
  styleUrls: ['./signin-oidc.component.scss']
})
export class SigninOidcComponent implements OnInit {

  constructor(private openIdConnectService: OpenIdConnectService,
    private router: Router) { }

  ngOnInit() {
    this.openIdConnectService.userLoaded$.subscribe((userLoaded) => {
      if (userLoaded) {
        this.router.navigate(['./']);  //登入成功就導到首頁
      } else {
        if (!environment.production) {
          console.log('An error happened: user wasn\'t loaded.');  //登入失敗就Log一下
        }
      }
    });

    this.openIdConnectService.handleCallback();  //登入結束後可以做的事情
  }
}
