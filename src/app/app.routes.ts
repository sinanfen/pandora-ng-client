// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LandingComponent } from './features/auth/components/landing/landing.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedInGuard } from './core/guards/logged-in.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  { path: '', component: LandingComponent }, // Ana sayfa
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'auth/login',
    canActivate: [loggedInGuard],
    loadComponent: () =>
      import('./features/auth/components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'categories',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
      },
      {
        path: 'personal-vaults',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/personal-vaults/personal-vaults.component').then(
            (m) => m.PersonalVaultsComponent
          ),
      },
      {
        path: 'password-vaults',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/password-vaults/password-vaults.component').then(
            (m) => m.PasswordVaultsComponent
          ),
      },
    ],
  },
];
