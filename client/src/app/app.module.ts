import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { BarRatingModule } from "ngx-bar-rating";
import { FileUploadModule } from 'ng2-file-upload';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './containers/home/home.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ProductGalleryComponent } from './components/product-gallery/product-gallery.component';
import { ProductCategoriesViewComponent } from './components/product-categories-view/product-categories-view.component';
import { ProductComponent } from './components/product/product.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { PageNotFoundComponent } from './containers/page-not-found/page-not-found.component';
import { ProductPageComponent } from './containers/product-page/product-page.component';
import { AdminComponent } from './containers/admin/admin.component';
import { ProductsAdminComponent } from './containers/admin/products-admin/products-admin.component';
import { AdminToolBarComponent } from './components/admin-tool-bar/admin-tool-bar.component';
import { ProductFormComponent } from './containers/admin/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsPageComponent } from './containers/products-page/products-page.component';
import { DashboardComponent } from './containers/admin/dashboard/dashboard.component';
import { CategoryFormComponent } from './containers/admin/category-form/category-form.component';
import { CategoriesAdminComponent } from './containers/admin/categories-admin/categories-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    GalleryComponent,
    ProductGalleryComponent,
    ProductCategoriesViewComponent,
    ProductComponent,
    SectionHeaderComponent,
    CategoryCardComponent,
    PageNotFoundComponent,
    ProductPageComponent,
    AdminComponent,
    ProductsAdminComponent,
    AdminToolBarComponent,
    ProductFormComponent,
    ProductsPageComponent,
    DashboardComponent,
    CategoryFormComponent,
    CategoriesAdminComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ToastrModule.forRoot(),
    BarRatingModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
