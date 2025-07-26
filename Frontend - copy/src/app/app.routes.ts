import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './features/admin/admin-layout/admin-layout.component';
import { AdminHomeComponent } from './features/admin/admin-dashboard/admin-home.component';
import { ManageBooksComponent } from './features/admin/manage-books/manage-books.component';
import { AdminRestockComponent } from './features/admin/admin-restock/admin-restock.component';
import { ManageUsersComponent } from './features/admin/manage-users/manage-users.component';
import { ManageOrdersComponent } from './features/admin/manage-orders/manage-orders.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path:'about',
    loadComponent: () =>
      import('./shared/components/about/about.component').then(
        (m) => m.AboutComponent
      ),
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard], 
    children: [
      { path: 'home', component: AdminHomeComponent },
      { path: 'manage-books', component: ManageBooksComponent },
      { path: 'manage-users', component: ManageUsersComponent },
      { path: 'manage-orders', component: ManageOrdersComponent },
      { path: 'restock', component: AdminRestockComponent },
    ],
  },
  {
    path: 'landingPage',
    loadComponent: () =>
      import('./shared/components/landing-page/landing-page.component').then(
        (m) => m.LandingPageComponent
      ),
  },
  {
    path: 'user',
    canActivate: [authGuard], 
    loadChildren: () =>
      import('./features/user/user-dashboard/user-dashboard.routes').then(
        (m) => m.USER_ROUTES
      ),
  },
  {
    path: '**',
    redirectTo: 'landingPage',
  },
];
