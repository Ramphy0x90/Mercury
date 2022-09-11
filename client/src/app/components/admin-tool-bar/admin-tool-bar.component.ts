import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-tool-bar',
  templateUrl: './admin-tool-bar.component.html',
  styleUrls: ['./admin-tool-bar.component.css']
})
export class AdminToolBarComponent implements OnInit {
  pathRoute: string[] = [];
  currentPath!: string;

  constructor(
      private router: Router,
      private productService: ProductService,
      private categoryService: CategoryService
    ) {
    router.events.subscribe(() => {
      this.currentPath = this.router.url;
    });
  }

  ngOnInit(): void {
  }

  showAddBtn() {
    return this.currentPath.startsWith('/admin/')
    && !this.currentPath.startsWith('/admin/add')
    && !this.currentPath.startsWith('/admin/edit');
  }

  showObjectActions() {
    return this.currentPath.startsWith('/admin/add')
    || this.currentPath.startsWith('/admin/edit');
  }

  addBtn() {
    if(this.currentPath == '/admin/products') return 'add-product';
    else if (this.currentPath == '/admin/categories') return 'add-category';
    else return '';
  }

  goBack() {
    this.close();

    if(this.currentPath.includes('product')) return 'products';
    else if (this.currentPath.includes('categor')) return 'categories';
    else return '';
  }

  setOnSave() {
    if(this.currentPath == '/admin/add-product' || this.currentPath.startsWith('/admin/edit-product')) {
      this.productService.onSaveProduct.emit(true);
    } else if(this.currentPath == '/admin/add-category' || this.currentPath.startsWith('/admin/edit-category')) {
      this.categoryService.onSaveCategory.emit(true);
    }
  }

  setOnDelete() {
    if(this.currentPath == '/admin/add-product' || this.currentPath.startsWith('/admin/edit-product')) {
      this.productService.onDeleteProduct.emit(true);
    } else if(this.currentPath == '/admin/add-category' || this.currentPath.startsWith('/admin/edit-category')) {
      this.categoryService.onDeleteCategory.emit(true);
    }
  }

  close() {
    if(this.currentPath == '/admin/add-product' || this.currentPath.startsWith('/admin/edit-product')) {
      this.productService.onSaveProduct.emit(false);
      this.productService.onDeleteProduct.emit(false);
    }
  }
}
