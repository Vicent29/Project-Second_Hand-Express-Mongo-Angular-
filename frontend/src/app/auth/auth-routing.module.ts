import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { NoAuthGuard } from '../core/guards';

const routes: Routes = [
  {
    path: 'register',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: '',
    redirectTo: "/auth/login",
    canActivate: [NoAuthGuard]
  }
];
console.log(routes);


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }