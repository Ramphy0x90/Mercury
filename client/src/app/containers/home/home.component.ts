import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

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

  bestSellersProducts!: Product[]; 

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.bestSellersProducts = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
