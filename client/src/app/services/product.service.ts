import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private router: Router) { }
}
