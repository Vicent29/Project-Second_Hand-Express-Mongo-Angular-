import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CategoryListComponent } from './list-category/list-category.component';
import { ProductListComponent } from './list-product/list-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { Carouselslide } from './carousel/carousel.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  declarations: [
    CategoryListComponent,
    ProductListComponent,
    ProductDetailsComponent,
    Carouselslide
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CategoryListComponent,
    ProductListComponent,
    ProductDetailsComponent,
    Carouselslide
  ],
})
export class SharedModule {}
