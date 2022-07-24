import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productCategories: Category[] = [
    {
      id: 1, name: 'Iluminacion', description: '', image: 'https://cdn.thewirecutter.com/wp-content/media/2021/12/smartLEDbulbs-2048px-7613.jpg'
    },
    {
      id: 1, name: 'Energia renovable', description: '', image: 'https://iea.imgix.net/9b69c4b4-e46f-43a6-9035-a8cf1143f56d/GettyImages-1169892501.jpg?auto=compress%2Cformat&fit=min&q=80&rect=0%2C0%2C3936%2C2624&w=1280&h=853&fit=crop&fm=jpg&q=70&auto=format'
    },
    {
      id: 1, name: 'Decoraciones', description: '', image: 'https://media.istockphoto.com/photos/posters-in-cozy-apartment-interior-picture-id943910360?k=20&m=943910360&s=612x612&w=0&h=nkX_Nr3FPR4qv79rvmqmBKn9qVzusmlHArtrenIzda0='
    },
    {
      id: 1, name: 'Ferreteria', description: '', image: 'https://cdn.thewirecutter.com/wp-content/media/2021/09/smart-wall-outlet-2048px-2941-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=1024'
    }
  ];

  bestSellersProducts: Product[] = [
    {
      id: 1, name: 'Luz led', description: 'Luz led para internos', image: 'https://www.fomei.com/ew/ew_images/image_of_object?ObjectIdentifier=pli:17b95920-d8b5-4340-94d8-658c425d6959&Filter=9c071f19-a887-49a5-b7b5-1fcf62116d80&ImageIndex=4', category: 1, rating: 3.5, tag: '', price: 3021, attributes: null, product_nodes: null 
    },
    {
      id: 2, name: 'Luz led', description: 'Luz paraa fotos idk', image: 'https://m.media-amazon.com/images/I/71JWHvFHuJL._AC_SL1500_.jpg', category: 1, rating: 3, tag: '', price: 3021, attributes: null, product_nodes: null 
    },
    {
      id: 3, name: 'Luz led', description: 'Luz led para internos', image: 'https://cdn.manfrotto.com/media/catalog/product/cache/15e30997edd2e02ad227dcd7c1a828d8/m/l/mll1300-bi-front.jpg', category: 1, rating: 5, tag: '', price: 3021, attributes: null, product_nodes: null 
    },
    {
      id: 4, name: 'TEST', description: 'Luz led para internos', image: 'http://sc04.alicdn.com/kf/H32c9bd38e6d04f9fa659491a986da87bp.jpg', category: 1, rating: 4, tag: '', price: 3021, attributes: null, product_nodes: null 
    },
    {
      id: 5, name: 'Luz led', description: 'Luz led para internos', image: 'https://www.fomei.com/ew/ew_images/image_of_object?ObjectIdentifier=pli:17b95920-d8b5-4340-94d8-658c425d6959&Filter=9c071f19-a887-49a5-b7b5-1fcf62116d80&ImageIndex=4', category: 1, rating: 3.5, tag: '', price: 3021, attributes: null, product_nodes: null 
    },
  ]; 

  constructor() { }

  ngOnInit(): void {
  }

}
