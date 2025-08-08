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
  token:string|null;
  constructor(private _HttpClient: HttpClient) { 
    this.token = localStorage.getItem('JWT_TOKEN');
  }

  getCartProducts(pageSize: number, pageNum: number): Observable<ApiResponse> {
    return this._HttpClient.get<ApiResponse>(`${environment.baseUrl}/api/v1/Cart?pageSize=${pageSize}&pageNumber=${pageNum}`
      , {
        headers:{
          Authorizaton: `Bearer ${this.token}`
        }
      }
    );
  }

  addProductToCart(item: Cartitem) {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/Cart`, item
      , {
        headers:{
          Authorization: `Bearer ${this.token}`
        }
      }
    );
  }

  deleteCartItem(id: number): Observable<ApiResponse> {
    return this._HttpClient.delete<ApiResponse>(`${environment.baseUrl}//api/v1/Cart/${id}`
      , {
        headers:{
          Authorization: `Bearer ${this.token}`
        }
      }
    );
  }

  increaseQuantity(id: number): Observable<ApiResponse> {
    return this._HttpClient.get<ApiResponse>(`${environment.baseUrl}/api/v1/Cart/plus/${id}`
      , {
        headers:{
          Authorization: `Bearer ${this.token}`
        }
      }
    );
  }

  decreaseQuantity(id: number): Observable<ApiResponse> {
    return this._HttpClient.get<ApiResponse>(`${environment.baseUrl}/api/v1/Cart/minus/${id}`
      , {
        headers:{
          Authorization: `Bearer ${this.token}`
        }
      }
    );
  }
}
