import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {
  @Input() category!: Category;

  constructor() { }

  ngOnInit(): void {
  }

}
