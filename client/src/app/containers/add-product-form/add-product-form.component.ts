import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { SubProduct } from 'src/app/models/sub-product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {
  hasAttributes: boolean = false;
  hasSubProducts: boolean = false;

  products!: Product[];
  productsToAppend: SubProduct[] = [];

  categories: Category[] = [
    {_id: 1, name: 'Leds', description: '', image: ''},
    {_id: 2, name: 'Casa', description: '', image: ''},
    {_id: 3, name: 'Luz', description: '', image: ''},
    {_id: 4, name: 'Energia', description: '', image: ''}
  ];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addSubProduct(subProductForm: any) {
    let formValues = subProductForm.value;

    let id: number = formValues.selection.id;
    let name: string = formValues.selection.name;
    let quantity: number = (formValues.quantity == '') ? 1 : formValues.quantity;

    if(name != undefined) {
      this.productsToAppend.push( 
        {
          _id: null,
          fk_product: id,
          name: name,
          quantity: quantity
        }
      );

      subProductForm.reset();
    }
  }

  removeSubProduct(subProduct: number) {
    let productIndex = this.productsToAppend.findIndex((object) => {
      return object.fk_product === subProduct;
    });

    this.productsToAppend.splice(productIndex, 1);
  }

}
