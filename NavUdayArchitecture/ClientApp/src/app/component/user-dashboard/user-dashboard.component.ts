import { Component, OnInit } from '@angular/core';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';
import { FrameworkService } from './framework-service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { tap } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  globalActiveMenuItem: any = null;
  Breakpoints = Breakpoints;
  currentBreakpoint:string = '';
  isLinear = false;
  readonly breakpoint$ = this.breakpointObserver
  .observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, '(min-width: 500px)'])
  .pipe(
    tap(value => console.log(value)),
    distinctUntilChanged()
  );

  constructor(private frameworkService: FrameworkService, private breakpointObserver: BreakpointObserver) {}


 
  private breakpointChanged() {
    if(this.breakpointObserver.isMatched(Breakpoints.Large)) {
      this.currentBreakpoint = Breakpoints.Large;
    } else if(this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.currentBreakpoint = Breakpoints.Medium;
    } else if(this.breakpointObserver.isMatched(Breakpoints.Small)) {
      this.currentBreakpoint = Breakpoints.Small;
    } else if(this.breakpointObserver.isMatched('(min-width: 500px)')) {
      this.currentBreakpoint = '(min-width: 500px)';
    }
  }
  ngOnInit(): void {
    this.breakpoint$.subscribe(() =>
    this.breakpointChanged()
  );
    this.frameworkService.activeMenu.subscribe((menu) => {
      this.globalActiveMenuItem = menu;
    });
  }

  fillNewApplicationForm() {
    this.frameworkService.addApplicationGlobalMenuAndMakeActive();
  }
}
