// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LandingComponent } from './features/auth/components/landing/landing.component';

export const routes: Routes = [
  { path: '', component: LandingComponent }, // Uygulama açıldığında landing page gösterilir
];
