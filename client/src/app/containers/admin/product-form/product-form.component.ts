import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { SubProduct } from 'src/app/models/sub-product';
import { ProductService } from 'src/app/services/product.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  onSaveSubscription: any;
  onDeleteSubscription: any;

  formMode!: string;
  currentPath!: string | undefined;

  hasAttributes: boolean = false;
  hasSubProducts: boolean = false;

  productId!: number;
  product: Product = {
    _id: null,
    name: '',
    description: '',
    image: '',
    category: 0,
    rating: 0,
    tag: '',
    price: 0,
    attributes: null,
    product_nodes: null,
    visible: false
  };

  products!: Product[];
  productsToAppend: SubProduct[] = [];

  formSubmitted: boolean = false;
  formChecked: boolean = false;
  addProductForm!: UntypedFormGroup;
  uploader!: FileUploader;

  categories: Category[] = [
    {_id: 1, name: 'Leds', description: '', image: ''},
    {_id: 2, name: 'Casa', description: '', image: ''},
    {_id: 3, name: 'Luz', description: '', image: ''},
    {_id: 4, name: 'Energia', description: '', image: ''}
  ];

  constructor(private productService: ProductService, private formBuilder: UntypedFormBuilder, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.uploader = productService.uploader;

    router.events.subscribe(() => {
      this.currentPath = this.router.url;

      if(this.currentPath.startsWith('/admin/edit-product')) {
        this.formMode = 'edit';

        this.activatedRoute.params.subscribe(params => {
          this.productId = params['id'];
        });

      } else {
        this.formMode = 'new';
      }
    });
  }

  ngOnInit(): void {
    // Get products to compose a new one
    this.productService.getProducts(true).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.log(err);
      }
    });

    // Set trigger when form is saved
    this.onSaveSubscription = this.productService.onSaveProduct.subscribe((event) => {
      if(event) this.saveProduct(event);
    });

    this.onDeleteSubscription = this.productService.onDeleteProduct.subscribe((event) => {
      if(event) this.deleteProduct();
    });

    this.form();
  }

  ngOnDestroy() {
    this.onSaveSubscription?.unsubscribe();
    this.onDeleteSubscription?.unsubscribe();
  }

  form() {
    this.addProductForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      visible: [false],
      description: ['', [Validators.required]],
      category: [''],
      price: [0],
      color: [''],
      material: [''],
      weight: [0],
      width: [0],
      height: [0]
    });

    // If form in edit mode, get product info to edit
    if(this.formMode == 'edit') {
      this.productService.getProduct((this.productId)).subscribe({
        next: (data) => {

          this.addProductForm = this.formBuilder.group({
            name: [data.name, [Validators.required]],
            visible: [data.visible],
            description: [data.description, [Validators.required]],
            category: [data.category],
            price: [data.price],
            color: [''],
            material: [''],
            weight: [0],
            width: [0],
            height: [0]
          });
          this.product = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  get getForm() {
    return this.addProductForm.controls;
  }

  upload() {
    this.productService.upload();
  }

  saveProduct(event: any) {
    let formValues = this.addProductForm.value;
    this.productService.upload();

    this.product = {
      _id: this.product._id,
      name: formValues.name,
      description: formValues.description,
      image: '',
      category: formValues.category,
      rating: 0,
      tag: '',
      price: formValues.price,
      attributes: null,
      product_nodes: null,
      visible: formValues.visible
    };

    this.formSubmitted = true;

    if(this.addProductForm.valid) {
      if(this.formMode == 'new') {
        this.productService.insertProduct(this.product);

        this.addProductForm.reset();

        this.toastr.success('Producto agregado!', '', {
          timeOut: 2000,
          progressBar: true
        });
      } else if(this.formMode == 'edit') {
        this.productService.updateProduct(this.product);

        this.toastr.success('Producto actualizado!', '', {
          timeOut: 2000,
          progressBar: true
        });
      }

      this.router.navigate(['admin/products']);
    } else {
      this.toastr.error('Revisar los datos introducidos!');
    }
  }

  deleteProduct() {
    this.productService.deleteProduct(this.productId);

    this.router.navigate(['admin/products']);

    this.toastr.success('Producto eliminado!', '', {
      timeOut: 2000,
      progressBar: true
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
