// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LandingComponent } from './features/auth/components/landing/landing.component';

export const routes: Routes = [
  { path: '', component: LandingComponent }, // Ana sayfa
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/components/login/login.component').then(m => m.LoginComponent)
  }
];
