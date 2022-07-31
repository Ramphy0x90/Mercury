import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.css']
})
export class ProductGalleryComponent implements OnInit {
  @Input() products!: Product[];
  productGallery: HTMLDivElement | any;
  lastScrollPosition!: number;
  scrollIndex: number | any;

  constructor() { }

  ngOnInit(): void {
    this.productGallery = document.querySelector('.product-gallery-container');
    this.scrollIndex = this.productGallery?.scrollLeft;
  }

  onOverflow() {
  }

  scrollLeft() {
    this.productGallery?.scroll({
      top: 0,
      left: this.productGallery?.scrollLeft - 150,
      behavior: 'smooth'
    });

  }

  scrollRight() {

    this.productGallery?.scroll({
      top: 0,
      left: this.productGallery?.scrollLeft + 150,
      behavior: 'smooth'
    });
  }
}
