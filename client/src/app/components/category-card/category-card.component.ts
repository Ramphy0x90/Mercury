import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {
  @Input() props!: {category: Category, onAdmin: boolean};
  category!: Category;
  onAdmin!: boolean;

  constructor() { }

  ngOnInit(): void {
    this.category = this.props.category;
    this.onAdmin = this.props.onAdmin;
  }

}
