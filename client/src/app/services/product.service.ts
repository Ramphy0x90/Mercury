import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  onSaveProduct: EventEmitter<boolean> = new EventEmitter();
  apiURL: string = environment.apiURL;

  constructor(private router: Router, private http: HttpClient) { }

  getProduct(id: number) {
    return this.http.get<Product>(`${this.apiURL}/products/${id}`);
  }

  getProducts() {
    return this.http.get<Product[]>(`${this.apiURL}/products/`);
  }

  insertProduct(product: Product) {
    this.http.post<Product>(`${this.apiURL}/products/insert/`, product).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (error) => {
        console.log(error)
      }
    });

    return true
  }

  insertSubProduct() {

  }
}
