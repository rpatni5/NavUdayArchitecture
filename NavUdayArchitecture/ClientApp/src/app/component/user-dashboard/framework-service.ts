import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FrameworkService {
  menu: any = null;
  globalActiveMenu: any;
  public activeMenu = new BehaviorSubject<any>(this.menu);
  public refreshGlobalNavBar = new BehaviorSubject<any[]>(
    this.getInitialNavBars()
  );

  constructor(private http: HttpClient) {}

  setActiveMenu(data: any) {
    this.globalActiveMenu = data;
    this.activeMenu.next(data);
  }
  getActiveMenu() {
    return this.globalActiveMenu;
  }

  addApplicationGlobalMenuAndMakeActive() {
    let navBars = this.getNavbarWithApplication();
    this.refreshGlobalNavBar.next(navBars);
    this.setActiveMenu(navBars.filter((x) => x.name == 'Application')[0]);
  }

  getInitialNavBars() {
    return [
      {
        name: 'Dashboard',
        url: '',
        isActive: true,
      },
    ];
  }

  getNavbarWithApplication() {
    return [
      {
        name: 'Dashboard',
        url: '',
        isActive: false,
      },
      {
        name: 'Application',
        url: '',
        isActive: true,
      },
    ];
  }
}
