import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-product-categories-view',
  templateUrl: './product-categories-view.component.html',
  styleUrls: ['./product-categories-view.component.css']
})
export class ProductCategoriesViewComponent implements OnInit {
  @Input() categories!: Category[];

  constructor() { }

  ngOnInit(): void {
  }

}
