import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule
  ],
  declarations: [
    ShopComponent
  ],
  providers: [
  ]
})
export class ShopModule { }