import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Iproduct } from '../models/iproduct';
import { Cartitem } from '../models/cartitem';

@Injectable({
  providedIn: 'root'
})
export class Fetchcart {
  constructor(private _HttpClient: HttpClient) { }

  getCartProducts(pageSize: number, pageNum: number): Observable<ApiResponse> {
    return this._HttpClient.get<ApiResponse>(`${environment.baseUrl}/api/v1/Cart?pageSize=${pageSize}&pageNumber=${pageNum}`)
  }

  addProductToCart(item: Cartitem) {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/Cart`, item);
  }

  deleteCartItem(id: number): Observable<ApiResponse> {
    return this._HttpClient.delete<ApiResponse>(`${environment.baseUrl}//api/v1/Cart/${id}`);
  }

  increaseQuantity(id: number): Observable<ApiResponse> {
    return this._HttpClient.get<ApiResponse>(`${environment.baseUrl}/api/v1/Cart/plus/${id}`);
  }

  decreaseQuantity(id: number): Observable<ApiResponse> {
    return this._HttpClient.get<ApiResponse>(`${environment.baseUrl}/api/v1/Cart/minus/${id}`);
  }
}
