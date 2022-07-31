import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product!: Product;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let productId!: number;
    
    this.activatedRoute.params.subscribe(params => {
      productId = params['id'];
    });

    this.productService.getProduct(productId).subscribe({
      next: (data) => {
        this.product = data;
      }
    });
  }
}
