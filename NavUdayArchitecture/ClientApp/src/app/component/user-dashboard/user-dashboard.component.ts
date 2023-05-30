import { Component, OnInit } from '@angular/core';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';
import { FrameworkService } from './framework-service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  globalActiveMenuItem: any = null;

  constructor(private frameworkService: FrameworkService) {}

  ngOnInit(): void {
    this.frameworkService.activeMenu.subscribe((menu) => {
      this.globalActiveMenuItem = menu;
    });
  }

  fillNewApplicationForm() {
    this.frameworkService.addApplicationGlobalMenuAndMakeActive();
  }
}
