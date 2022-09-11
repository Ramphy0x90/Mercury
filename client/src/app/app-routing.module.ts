import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './containers/admin/product-form/product-form.component';
import { AdminComponent } from './containers/admin/admin.component';
import { HomeComponent } from './containers/home/home.component';
import { PageNotFoundComponent } from './containers/page-not-found/page-not-found.component';
import { ProductPageComponent } from './containers/product-page/product-page.component';
import { ProductsAdminComponent } from './containers/admin/products-admin/products-admin.component';
import { ProductsPageComponent } from './containers/products-page/products-page.component';
import { DashboardComponent } from './containers/admin/dashboard/dashboard.component';
import { CategoriesAdminComponent } from './containers/admin/categories-admin/categories-admin.component';
import { CategoryFormComponent } from './containers/admin/category-form/category-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: '', component: DashboardComponent },
    { path: 'products', component: ProductsAdminComponent },
    { path: 'add-product', component: ProductFormComponent },
    { path: 'edit-product/:id', component: ProductFormComponent },
    { path: 'categories', component: CategoriesAdminComponent },
    { path: 'add-category', component: CategoryFormComponent },
    { path: 'edit-category/:id', component: CategoryFormComponent }
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
