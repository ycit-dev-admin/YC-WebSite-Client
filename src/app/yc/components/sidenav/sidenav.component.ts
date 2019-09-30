import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  constructor(
    private router: Router,
    zone: NgZone) {

    //下列為教學原本的語法，但似乎是Ng版本問題 順著教學這裡會出錯 待往後釐清...
    //this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql));  

    //嘗試改成下列這個寫法  
    //解法出處:https://stackoverflow.com/questions/54097590/build-error-after-angular-upgrade-mediaquerylistevent-not-assignable-of-type-m
    //原因: 也不清楚就照做...
    this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));

    
  }

  @ViewChild(MatDrawer) drawer: MatDrawer;

  ngOnInit() {
    this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.drawer.close();
      }
    });
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

}
