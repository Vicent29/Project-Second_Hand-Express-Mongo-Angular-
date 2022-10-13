import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    resolve: {},
  },
  {
    path: 'category/:slug',
    component: ShopComponent,
    resolve: {},
  },
  {
    path: ':filters',
    component: ShopComponent,
    resolve: {},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ShopRoutingModule { }