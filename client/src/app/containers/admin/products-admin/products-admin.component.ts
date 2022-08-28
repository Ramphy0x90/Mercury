import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnInit {
  products!: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts(true).subscribe({
      next: (data) => {
        this.products = data;
      }
    });
  }

}
