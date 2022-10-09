import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CategoryListComponent } from './list-category/list-category.component';
import { ProductListComponent } from './list-product/list-product.component';
import { Carouselslide } from './carousel/carousel.component';
import {InfiniteScroll} from './infinite-scroll/inf-scroll.component'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    InfiniteScrollModule
  ],
  declarations: [
    CategoryListComponent,
    ProductListComponent,
    Carouselslide,
    InfiniteScroll
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CategoryListComponent,
    ProductListComponent,
    Carouselslide,
    InfiniteScroll
  ],
})
export class SharedModule {}
