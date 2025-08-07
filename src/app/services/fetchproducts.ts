import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Iproduct } from '../models/iproduct';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class Fetchproducts {
  token:string|null;
  constructor(private _HttpClient: HttpClient) { 
    this.token = localStorage.getItem('JWT_TOKEN');
  }

  getAllProducts(pageNum: number, pageSize: number): Observable<ApiResponse> {
    return this._HttpClient.get<ApiResponse>(`${environment.baseUrl}/api/v1/Product?pageSize=${pageSize}&pageNumber=${pageNum}`);
  }

  getProductsByCatId(pageNum: number, pageSize: number, catId: number) {
    return this._HttpClient.get<ApiResponse>(`${environment.baseUrl}/api/v1/Product?categoryId=${catId}&pageSize=${pageSize}&pageNumber=${pageNum}`);
  }

  getProductById(id: number): Observable<ApiResponse> {
    return this._HttpClient.get<ApiResponse>(`${environment.baseUrl}/api/v1/Product/${id}`)
  }

  addProduct(product: Iproduct): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('stock', product.stock.toString());
    formData.append('categoryid', product.categoryId.toString());
   
    
    product.images.forEach(img => {
      formData.append('images', img);
    })
    return this._HttpClient.post<ApiResponse>(`${environment.baseUrl}/api/v1/Product`, formData, {
      headers:{
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  updateProduct(id: number, product: Iproduct): Observable<ApiResponse> {
    return this._HttpClient.put<ApiResponse>(`${environment.baseUrl}/api/v1/Product/${id}`, product);
  }

  deleteProduct(id: number): Observable<ApiResponse> {
    return this._HttpClient.delete<ApiResponse>(`${environment.baseUrl}/api/v1/Product/${id}`);
  }

}
