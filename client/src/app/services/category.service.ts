import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Category } from '../models/category';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public uploader!: FileUploader;
  onSaveCategory: EventEmitter<boolean> = new EventEmitter();
  onDeleteCategory: EventEmitter<boolean> = new EventEmitter();
  apiURL: string = environment.apiURL;
  serverURL: string = environment.serverURL;
  uploadedImage: any;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.uploader = new FileUploader({
      itemAlias: 'file'
    });

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) =>
      this.onSuccessItem(item, response, status, headers);
  }

  getCategory(id: number) {
    return this.http.get<Category>(`${this.apiURL}/categories/${id}`);
  }

  getCategories(all: boolean = false, visible: string = 'yes') {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('all', all)
                             .append('visible', visible);

    return this.http.get<Category[]>(`${this.apiURL}/categories/`, {params: queryParams});
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) {
    let data = JSON.parse(response);
    this.uploadedImage = `${this.serverURL}/${data.path}`;

    this.toastr.success('Imagen cargada!');
  }

  upload() {
    this.uploader.setOptions({
      url: `${this.apiURL}/categories/upload`,
    });

    this.uploader.uploadAll();
  }

  insertCategory(category: Category) {
    category.image = this.uploadedImage;

    this.http.post<Category>(`${this.apiURL}/categories/insert/`, category).subscribe({
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateCategory(category: Category) {
    category.image = this.uploadedImage;

    this.http.post<Category>(`${this.apiURL}/categories/update/`, category).subscribe({
      error: (error) => {
        console.log(error);
      }
    });
  }

  deleteCategory(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', id);

    this.http.delete<Category>(`${this.apiURL}/categories/delete`, {params: queryParams}).subscribe({
      error: (error) => {
        console.log(error);
      }
    });
  }
}
