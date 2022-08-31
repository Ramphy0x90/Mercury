import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { Attribute } from '../models/attribute';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public uploader!: FileUploader;
  onSaveProduct: EventEmitter<boolean> = new EventEmitter();
  onDeleteProduct: EventEmitter<boolean> = new EventEmitter();
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

  getProduct(id: number) {
    return this.http.get<Product>(`${this.apiURL}/products/${id}`);
  }

  getProducts(all: boolean = false, visible: string = 'yes') {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('all', all)
                             .append('visible', visible);

    return this.http.get<Product[]>(`${this.apiURL}/products/`, {params: queryParams});
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
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateProduct(product: Product) {
    product.image = this.uploadedImage;

    this.http.post<Product>(`${this.apiURL}/products/update/`, product).subscribe({
      error: (error) => {
        console.log(error);
      }
    });
  }

  deleteProduct(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', id);

    this.http.delete<Product>(`${this.apiURL}/products/delete`, {params: queryParams}).subscribe({
      error: (error) => {
        console.log(error);
      }
    });
  }

  getAttribute(id: number) {
    return this.http.get<Attribute>(`${this.apiURL}/products/attribute/${id}`);
  }

  insertAttribute(attribute: Attribute) {
    return this.http.post<Attribute>(`${this.apiURL}/products/insert/attribute`, attribute);
  }

  updateAttribute(attribute: Attribute) {
    this.http.post<Attribute>(`${this.apiURL}/products/update/attribute`, attribute).subscribe({
      error: (error) => {
        console.log(error);
      }
    });
  }

  deleteAttribute(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id', id);

    this.http.delete<Attribute>(`${this.apiURL}/products/delete/attribute`, {params: queryParams}).subscribe({
      error: (error) => {
        console.log(error);
      }
    });
  }

  insertSubProduct() {

  }
}
