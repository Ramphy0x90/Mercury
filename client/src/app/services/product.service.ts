import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiURL: string = environment.apiURL;

  constructor(private router: Router, private http: HttpClient) { }

  getProduct(id: number) {
    return this.http.get<Product>(`${this.apiURL}/products/${id}`);
  }

  getProducts() {
    return this.http.get<Product[]>(`${this.apiURL}/products/`);
  }
}
