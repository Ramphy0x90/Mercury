import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-tool-bar',
  templateUrl: './admin-tool-bar.component.html',
  styleUrls: ['./admin-tool-bar.component.css']
})
export class AdminToolBarComponent implements OnInit {
  pathRoute: string[] = [];
  currentPath!: string;

  constructor(private router: Router, private productService: ProductService) {
    router.events.subscribe(() => {
      this.currentPath = this.router.url;
    });
  }

  ngOnInit(): void {
  }

  setOnSaveProduct() {
    this.productService.onSaveProduct.emit(true);
  }

  setOnDeleteProduct() {
    this.productService.onDeleteProduct.emit(true);
  }

  closeProduct() {
    this.productService.onSaveProduct.emit(false);
    this.productService.onDeleteProduct.emit(false);
  }
}
