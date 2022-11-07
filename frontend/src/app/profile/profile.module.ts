import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileProductsComponent } from './user-MY_Products/profile-MyProducts.component';
import { ProfileFavProductsComponent } from './user-FAV_Products/profile-FavProducts.component';

@NgModule({
  imports: [SharedModule, ProfileRoutingModule, CommonModule],
  declarations: [
    ProfileComponent,
    ProfileProductsComponent,
    ProfileFavProductsComponent,
  ],
  providers: [],
})
export class ProfileModule {}
