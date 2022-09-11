import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  onSaveSubscription: any;
  onDeleteSubscription: any;

  formMode!: string;
  currentPath!: string | undefined;

  categoryId!: number;
  category: Category = {
    _id: null,
    name: '',
    description: '',
    image: '',
  };

  categories!: Category[];

  addCategoryForm!: UntypedFormGroup;
  uploader!: FileUploader;

  constructor(private categoryService: CategoryService, private formBuilder: UntypedFormBuilder, private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.uploader = categoryService.uploader;

    router.events.subscribe(() => {
      this.currentPath = this.router.url;

      if(this.currentPath.startsWith('/admin/edit')) {
        this.formMode = 'edit';

        this.activatedRoute.params.subscribe(params => {
          this.categoryId = params['id'];
        });

      } else {
        this.formMode = 'new';
      }
    });
  }

  ngOnInit(): void {
    // If form in edit mode, get product info to edit
    if(this.formMode == 'edit') {
      this.categoryService.getCategory(this.categoryId).subscribe({
        next: (data) => {       
          this.category = data;

          this.form();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

    // Get categories to compose a new one
    this.categoryService.getCategories(true).subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.log(err);
      }
    });

    // Set trigger when form is saved
    this.onSaveSubscription = this.categoryService.onSaveCategory.subscribe((event) => {
      if(event) this.saveCategory();
    });

    this.onDeleteSubscription = this.categoryService.onDeleteCategory.subscribe((event) => {
      if(event) this.deleteCategory();
    });

    this.form();
  }

  ngOnDestroy() {
    this.onSaveSubscription?.unsubscribe();
    this.onDeleteSubscription?.unsubscribe();
  }

  form() {
    this.addCategoryForm = this.formBuilder.group({
      name: [this.category.name, [Validators.required]],
      description: [this.category.description, [Validators.required]],
    });
  }

  get getForm() {
    return this.addCategoryForm.controls;
  }

  /**
   * Upload category image
   */
  upload() {
    this.categoryService.upload();
  }

  /**
   * This function is used to save category changes
   * changes could be when a new category is created
   * or when a category is modified
   */
  saveCategory() {
    let formValues = this.addCategoryForm.value;
    this.categoryService.upload();

    // Product model with form values
    this.category = {
      _id: this.category._id,
      name: formValues.name,
      description: formValues.description,
      image: '',
    };

    if(this.addCategoryForm.valid) {
      if(this.formMode == 'new') {
        this.categoryService.insertCategory(this.category);
        this.addCategoryForm.reset();

        this.toastr.success('Categoria agregada!', '', {
          timeOut: 2000,
          progressBar: true
        });
      } else if(this.formMode == 'edit') {
        this.categoryService.updateCategory(this.category);

        this.toastr.success('Categoria actualizada!', '', {
          timeOut: 2000,
          progressBar: true
        });
      }

      this.router.navigate(['admin/categories']);
    } else {
      this.toastr.error('Revisar los datos introducidos!');
    }
  }

  /**
   * Delete a selected category
   */
  deleteCategory() {
    this.categoryService.deleteCategory(this.categoryId);

    this.router.navigate(['admin/categories']);

    this.toastr.success('Categoria eliminada!', '', {
      timeOut: 2000,
      progressBar: true
    });
  }
}
