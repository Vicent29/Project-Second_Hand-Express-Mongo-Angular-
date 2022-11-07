import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileResolver } from './profile-resolve.service';
import { ProfileProductsComponent } from './user-MY_Products/profile-MyProducts.component';
import { ProfileFavProductsComponent } from './user-FAV_Products/profile-FavProducts.component';

const routes: Routes = [
  {
    path: ':username',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolver,
    },
    children: [
      {
        path: '',
        component: ProfileProductsComponent,
      },
      {
        path: 'favorites/:username',
        component: ProfileFavProductsComponent,
        resolve: {
          profile: ProfileResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
