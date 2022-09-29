import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ProductListComponent } from './components/product-list/product-list.component';
// import { ProductDetailsComponent } from './components/product-details/product-details.component';
// import { AddProductComponent } from './components/add-product/add-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'product', pathMatch: 'full' },
  {
    path: 'category',
    loadChildren: () =>
      import('./category.module').then((m) => m.CategoryModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./product.module').then((m) => m.ProductModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
