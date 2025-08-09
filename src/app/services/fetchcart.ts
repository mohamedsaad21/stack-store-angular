import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Iproduct } from '../models/iproduct';
import { Cartitem } from '../models/cartitem';

@Injectable({
  providedIn: 'root'
})
export class Fetchcart {
  token: string | null;

  constructor(private _HttpClient: HttpClient) {
    this.token = localStorage.getItem('JWT_TOKEN');
  }
  getCartProducts(pageSize: number, pageNum: number): Observable<ApiResponse> {
    return this._HttpClient.get<ApiResponse>(`${environment.baseUrl}/api/v1/Cart?pageSize=${pageSize}&pageNumber=${pageNum}`
      , {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    );
  }

  addProductToCart(item: Cartitem) {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/Cart`, item
      , {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    );
  }

  deleteCartItem(cartItemId: number): Observable<ApiResponse> {
    return this._HttpClient.delete<ApiResponse>(
      `${environment.baseUrl}/api/v1/Cart/${cartItemId}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    );
  }

  increaseQuantity(cartItemId: number): Observable<ApiResponse> {
    return this._HttpClient.get<ApiResponse>(`${environment.baseUrl}/api/v1/Cart/plus/${cartItemId}`
      , {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    );
  }

  decreaseQuantity(cartItemId: number): Observable<ApiResponse> {
    return this._HttpClient.get<ApiResponse>(`${environment.baseUrl}/api/v1/Cart/minus/${cartItemId}`
      , {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    );
  }
}
