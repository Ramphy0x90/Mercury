import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() props!: {product: Product, onAdmin: boolean};
  product!: Product;
  onAdmin!: boolean;

  constructor() { }

  ngOnInit(): void {
    this.product = this.props.product;
    this.onAdmin = this.props.onAdmin;
  }

}
