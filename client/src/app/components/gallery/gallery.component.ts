import { Component, OnInit } from '@angular/core';
import { GalleryItem } from '../models/gallery-item';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  galleryItems: GalleryItem[] = [
    {
      image: 'https://cdn.hswstatic.com/gif/LED-1.jpg',
      alt: ''
    },
    {
      image: 'https://www.popsci.com/uploads/2021/03/24/Backlit_Compueter_Laptop.jpg?auto=webp',
      alt: ''
    },
    {
      image: 'https://lightingequipmentsales.com/wp-content/uploads/2018/02/LED-Light-Strip-740x416.jpg',
      alt: ''
    }
  ] 

  constructor() { }

  ngOnInit(): void {
  }

  getClass(index: number) {
    let classes = 'carousel-item ';

    classes += (index == 0) ? 'active' : '';

    return classes;
  }

}
