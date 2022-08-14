import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { SubProduct } from 'src/app/models/sub-product';
import { ProductService } from 'src/app/services/product.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

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

  formSubmitted: boolean = false;
  formChecked: boolean = false;
  addProductForm!: UntypedFormGroup;

  categories: Category[] = [
    {_id: 1, name: 'Leds', description: '', image: ''},
    {_id: 2, name: 'Casa', description: '', image: ''},
    {_id: 3, name: 'Luz', description: '', image: ''},
    {_id: 4, name: 'Energia', description: '', image: ''}
  ];

  constructor(private productService: ProductService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.productService.onSaveProduct.subscribe(() => {
      this.addProduct();
    });

    this.form();
  }

  form() {
    this.addProductForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: [''],
      price: [0],
      color: [''],
      material: [''],
      weight: [0],
      width: [0],
      height: [0]
    });
  }

  get getForm() {
    return this.addProductForm.controls;
  }

  addProduct() {
    let formValues = this.addProductForm.value;
    this.formSubmitted = true;

    let product: Product = {
      _id: null,
      name: formValues.name,
      description: formValues.description,
      image: '',
      category: formValues.category,
      rating: 0,
      tag: '',
      price: formValues.price,
      attributes: null,
      product_nodes: null,
      visible: true
    };

    this.productService.insertProduct(product);

    if(this.addProductForm.valid) {
      this.formSubmitted = false;
      this.formChecked = true;

      //this.addProductForm.reset();
    } else {
      this.formChecked = false;
    }
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
