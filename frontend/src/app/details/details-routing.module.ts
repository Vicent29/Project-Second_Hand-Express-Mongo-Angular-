import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DetailsComponent } from './details.component';

const routes: Routes = [
    { path: ':slug', component: DetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetailsRoutingModule { }