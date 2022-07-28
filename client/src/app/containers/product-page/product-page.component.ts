import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product: Product = {
    id: 1, name: 'Luz led', description: 'Luz led para internos', image: 'https://www.fomei.com/ew/ew_images/image_of_object?ObjectIdentifier=pli:17b95920-d8b5-4340-94d8-658c425d6959&Filter=9c071f19-a887-49a5-b7b5-1fcf62116d80&ImageIndex=4', category: 1, rating: 3.5, tag: '', price: 3021, attributes: null, product_nodes: null 
  }

  constructor() { }

  ngOnInit(): void {
  }

}
