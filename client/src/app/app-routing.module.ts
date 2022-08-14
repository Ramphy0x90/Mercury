import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductFormComponent } from './containers/add-product-form/add-product-form.component';
import { AdminComponent } from './containers/admin/admin.component';
import { HomeComponent } from './containers/home/home.component';
import { PageNotFoundComponent } from './containers/page-not-found/page-not-found.component';
import { ProductPageComponent } from './containers/product-page/product-page.component';
import { ProductsAdminComponent } from './containers/products-admin/products-admin.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'products', component: ProductsAdminComponent },
    { path: 'add-product', component: AddProductFormComponent }
  ] },
  { path: 'product/:id', component: ProductPageComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
