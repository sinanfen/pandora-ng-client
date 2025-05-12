import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule,
  ],
})
export class MainLayoutComponent {
  loggedInUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
  };

  menuOpen = false; // user menu
  navMenuOpen = true; // nav drawer

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleNavMenu() {
    this.navMenuOpen = !this.navMenuOpen;
  }

  logout() {
    // Clear token and redirect to login
    localStorage.removeItem('token');
    window.location.href = '/auth/login';
  }
}
