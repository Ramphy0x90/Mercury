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
    product_nodes: false,
    visible: false
  };
  attribute: Attribute = { _id: null, color: '', material: '', weight: 0, width: 0, height: 0};

  products!: Product[];
  subProducts: SubProduct[] = [];

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
    // If form in edit mode, get product info to edit
    if(this.formMode == 'edit') {
      this.productService.getProduct(this.productId).subscribe({
        next: (data) => {       
          this.product = data;
          this.hasSubProducts = data.product_nodes;

          // If product has attributes, set attributes
          if(this.product.attributes) {
            this.productService.getAttribute(this.product.attributes).subscribe((attribute) => {
              this.hasAttributes = true;
              this.attribute = attribute;
              this.form();
            });
          }

          this.form();
        },
        error: (err) => {
          console.log(err);
        }
      });

      // Get sub products of product
      this.productService.getSubProducts(this.productId).subscribe((subProducts) => {
        this.subProducts = subProducts;
      });
    }

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
      name: [this.product.name, [Validators.required]],
      visible: [this.product.visible],
      description: [this.product.description, [Validators.required]],
      category: [this.product.category],
      price: [this.product.price],
      color: [this.attribute.color],
      material: [this.attribute.material],
      weight: [this.attribute.weight],
      width: [this.attribute.width],
      height: [this.attribute.height]
    });
  }

  get getForm() {
    return this.addProductForm.controls;
  }

  /**
   * Upload product image
   */
  upload() {
    this.productService.upload();
  }

  /**
   * This function is used to save product changes
   * changes could be when a new product is created
   * or when a product is modified
   */
  saveProduct() {
    let formValues = this.addProductForm.value;
    this.productService.upload();

    // Product model with form values
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
      product_nodes: this.hasSubProducts,
      visible: formValues.visible
    };

    // attribute model with form values
    this.attribute = {
      _id: this.attribute._id,
      color: formValues.color,
      material: formValues.material,
      weight: formValues.weight,
      width: formValues.width,
      height: formValues.height
    };

    if(this.addProductForm.valid) {
      if(this.formMode == 'new') {
        // Check if product attributes are enabled
        // If product attributes are enabled, insert attribute
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
        // If product has no attributes but attributes
        // are inserted, insert new attributes
        if(!this.product.attributes && this.hasAttributes) {
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
          } else if(this.product.attributes) {
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

  /**
   * Delete a selected product
   */
  deleteProduct() {
    this.productService.deleteProduct(this.productId);

    this.router.navigate(['admin/products']);

    this.toastr.success('Producto eliminado!', '', {
      timeOut: 2000,
      progressBar: true
    });
  }

  /**
   * Add Sub product to a product
   * @param subProductForm 
   */
  addSubProduct(subProductForm: any) {
    let formValues = subProductForm.value;

    let id: number = formValues.selection.id;
    let name: string = formValues.selection.name;
    let quantity: number = (formValues.quantity == '') ? 1 : formValues.quantity;

    if(name != undefined) {
      let subProduct = {
        _id: null,
        fk_parent: this.product._id,
        fk_product: id,
        name: name,
        quantity: quantity
      };

      this.productService.insertSubProduct(subProduct).subscribe((data) => {
        this.subProducts.push(data);
        this.product.product_nodes = true;

        this.productService.updateProduct(this.product);
      })

      subProductForm.reset();
    }
  }

  /**
   * Remove sub product from a product
   * @param subProduct
   */
  removeSubProduct(subProduct: number) {
    let productIndex = this.subProducts.findIndex((object) => {
      return object.fk_product === subProduct;
    });

    let productId = this.subProducts[productIndex]._id;

    if(productId) this.productService.deleteSubProduct(productId);
    this.subProducts.splice(productIndex, 1);
  }

}
