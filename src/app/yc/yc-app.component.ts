import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-yc-app',
  template: `<app-sidenav></app-sidenav>`,
  styles: []
})
export class YcAppComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('baseline-more_vert', sanitizer.bypassSecurityTrustResourceUrl('/assets/baseline-more_vert-24px.svg'));
    iconRegistry.addSvgIcon('baseline-menu', sanitizer.bypassSecurityTrustResourceUrl('/assets/baseline-menu-24px.svg'));
    iconRegistry.addSvgIcon('baseline-add', sanitizer.bypassSecurityTrustResourceUrl('/assets/baseline-add-24px.svg'));;
  }

  ngOnInit() {
  }

}
