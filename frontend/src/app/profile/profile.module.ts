import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileProductsComponent } from './user-MY_Products/profile-MyProducts.component';
import { ProfileComponent } from './profile.component';
// import { ProfileFavoritesComponent } from './profile-favorites.component';
import { SharedModule } from '../shared';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule,
    CommonModule
  ],
  declarations: [
    ProfileProductsComponent,
    ProfileComponent,
    // ProfileFavoritesComponent
  ],
  providers: [
  ],
})
export class ProfileModule {}

