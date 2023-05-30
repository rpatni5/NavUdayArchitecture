import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard.component';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';
import { AppShellNavigationComponent } from '../app-shell-navigation/app-shell-navigation.component';
import { FrameworkService } from './framework-service';

const routes: Routes = [{ path: '', component: UserDashboardComponent }];

@NgModule({
  declarations: [
    UserDashboardComponent,
    NavMenuComponent,
    AppShellNavigationComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [FrameworkService],
})
export class UserDashboardModule {}
