import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public uploader!: FileUploader;
  onSaveProduct: EventEmitter<boolean> = new EventEmitter();
  apiURL: string = environment.apiURL;
  serverURL: string = environment.serverURL;
  uploadedImage: any;

  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) {
    this.uploader = new FileUploader({
      itemAlias: 'file'
    });

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) =>
      this.onSuccessItem(item, response, status, headers);
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${this.apiURL}/products/${id}`);
  }

  getProducts() {
    return this.http.get<Product[]>(`${this.apiURL}/products/`);
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) {
    let data = JSON.parse(response);
    this.uploadedImage = `${this.serverURL}/${data.path}`;

    this.toastr.success('Imagen cargada!');
  }

  upload() {
    this.uploader.setOptions({
      url: `${this.apiURL}/products/upload`,
    });

    this.uploader.uploadAll();
  }

  insertProduct(product: Product) {
    product.image = this.uploadedImage;

    this.http.post<Product>(`${this.apiURL}/products/insert/`, product).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  insertSubProduct() {

  }
}
