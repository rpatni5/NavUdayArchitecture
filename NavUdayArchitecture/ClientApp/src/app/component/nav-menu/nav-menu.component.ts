import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private authService: AuthService) {}
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  onLogoutClick() {
    this.authService.logout();
  }
}
