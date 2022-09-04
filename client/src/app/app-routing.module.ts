import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './containers/admin/product-form/product-form.component';
import { AdminComponent } from './containers/admin/admin.component';
import { HomeComponent } from './containers/home/home.component';
import { PageNotFoundComponent } from './containers/page-not-found/page-not-found.component';
import { ProductPageComponent } from './containers/product-page/product-page.component';
import { ProductsAdminComponent } from './containers/admin/products-admin/products-admin.component';
import { ProductsPageComponent } from './containers/products-page/products-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'products', component: ProductsAdminComponent },
    { path: 'add-product', component: ProductFormComponent },
    { path: 'edit-product/:id', component: ProductFormComponent }
  ] },
  { path: 'product/:id', component: ProductPageComponent },
  { path: 'products', component: ProductsPageComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
