import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bestSellersProducts: Product[] = [
    {
      id: 1, name: 'Luz led', description: 'Luz led para internos', image: 'https://www.fomei.com/ew/ew_images/image_of_object?ObjectIdentifier=pli:17b95920-d8b5-4340-94d8-658c425d6959&Filter=9c071f19-a887-49a5-b7b5-1fcf62116d80&ImageIndex=4', category: 'Luz', rating: 3.5, tag: '', price: 3021, attributes: null, product_nodes: null 
    },
    {
      id: 2, name: 'Luz led', description: 'Luz paraa fotos idk', image: 'https://m.media-amazon.com/images/I/71JWHvFHuJL._AC_SL1500_.jpg', category: 'Luz', rating: 3, tag: '', price: 3021, attributes: null, product_nodes: null 
    },
    {
      id: 3, name: 'Luz led', description: 'Luz led para internos', image: 'https://cdn.manfrotto.com/media/catalog/product/cache/15e30997edd2e02ad227dcd7c1a828d8/m/l/mll1300-bi-front.jpg', category: 'Luz', rating: 5, tag: '', price: 3021, attributes: null, product_nodes: null 
    },
    {
      id: 4, name: 'TEST', description: 'Luz led para internos', image: 'http://sc04.alicdn.com/kf/H32c9bd38e6d04f9fa659491a986da87bp.jpg', category: 'Luz', rating: 4, tag: '', price: 3021, attributes: null, product_nodes: null 
    },
    {
      id: 5, name: 'Luz led', description: 'Luz led para internos', image: 'https://www.fomei.com/ew/ew_images/image_of_object?ObjectIdentifier=pli:17b95920-d8b5-4340-94d8-658c425d6959&Filter=9c071f19-a887-49a5-b7b5-1fcf62116d80&ImageIndex=4', category: 'Luz', rating: 3.5, tag: '', price: 3021, attributes: null, product_nodes: null 
    },
  ]; 

  constructor() { }

  ngOnInit(): void {
  }

}
