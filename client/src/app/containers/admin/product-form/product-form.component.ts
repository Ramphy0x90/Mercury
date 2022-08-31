import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { SubProduct } from 'src/app/models/sub-product';
import { ProductService } from 'src/app/services/product.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute } from '@angular/router';
import { Attribute } from 'src/app/models/attribute';

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
  attribute: Attribute = {
    _id: null,
    color: '',
    material: '',
    weight: 0,
    width: 0,
    height: 0
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
      if(event) this.saveProduct();
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
      this.productService.getProduct(this.productId).subscribe({
        next: (data) => {
          if(data.attributes) {
            this.productService.getAttribute(data.attributes).subscribe((attribute) => {
              this.addProductForm = this.formBuilder.group({
                name: [data.name, [Validators.required]],
                visible: [data.visible],
                description: [data.description, [Validators.required]],
                category: [data.category],
                price: [data.price],
                color: [attribute.color],
                material: [attribute.material],
                weight: [attribute.weight],
                width: [attribute.width],
                height: [attribute.height]
              });

              if(data.attributes != null) this.hasAttributes = true;
              this.attribute = attribute;
            });
          } else {
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
          }
        
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

  saveProduct() {
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
      attributes: this.product.attributes,
      product_nodes: null,
      visible: formValues.visible
    };

    this.attribute = {
      _id: this.attribute._id,
      color: formValues.color,
      material: formValues.material,
      weight: formValues.weight,
      width: formValues.width,
      height: formValues.height
    };

    this.formSubmitted = true;

    if(this.addProductForm.valid) {
      if(this.formMode == 'new') {
        if(this.hasAttributes) {
          this.productService.insertAttribute(this.attribute).subscribe({
            next: (data) => {
              this.product.attributes = data._id;
              this.productService.insertProduct(this.product);
            },
            error: () => {
              this.toastr.error('Error con los atributos!', '', {
                timeOut: 2000,
                progressBar: true
              });
            }
          });
        } else {
          this.productService.insertProduct(this.product);
        }

        this.addProductForm.reset();

        this.toastr.success('Producto agregado!', '', {
          timeOut: 2000,
          progressBar: true
        });
      } else if(this.formMode == 'edit') {
        if(!this.product.attributes) {
          this.productService.insertAttribute(this.attribute).subscribe({
            next: (data) => {
              this.product.attributes = data._id;
              this.productService.updateProduct(this.product);
            },
            error: () => {
              this.toastr.error('Error con los atributos!', '', {
                timeOut: 2000,
                progressBar: true
              });
            }
          });
        } else {
          if(this.hasAttributes) {
            this.productService.updateAttribute(this.attribute);
          } else {
            this.productService.deleteAttribute(this.product.attributes);
            this.product.attributes = null;
          }

          this.productService.updateProduct(this.product);
        }

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
