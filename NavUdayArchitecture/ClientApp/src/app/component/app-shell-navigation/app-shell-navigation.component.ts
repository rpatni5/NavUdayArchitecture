import { Component, OnInit } from '@angular/core';
import { FrameworkService } from '../user-dashboard/framework-service';

@Component({
  selector: 'app-shell-navigation',
  templateUrl: './app-shell-navigation.component.html',
  styleUrls: ['./app-shell-navigation.component.scss'],
})
export class AppShellNavigationComponent implements OnInit {
  navbars: any[] = [];

  constructor(private frameworkService: FrameworkService) {
    this.navbars = this.frameworkService.getInitialNavBars();
  }

  ngOnInit(): void {
    this.frameworkService.setActiveMenu(this.navbars[0]);

    this.frameworkService.refreshGlobalNavBar.subscribe((navbars) => {
      this.navbars = navbars;
    });
  }

  makeUrlActive(menu: any) {
    this.navbars.forEach((x) => (x.isActive = false));
    menu.isActive = true;
    if (menu.name == 'Dashboard') {
      this.navbars = this.frameworkService.getInitialNavBars();
    }
    this.frameworkService.setActiveMenu(menu);
  }

  isMenuActive(menu: any) {
    return menu.isActive;
  }
}
