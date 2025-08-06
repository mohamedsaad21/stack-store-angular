import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class Fetchcategories {
  constructor(private _HttpClient: HttpClient) { }

  getAllCategories(pageSize:number, pageNum:number):Observable<ApiResponse>{
    return this._HttpClient.get<ApiResponse>(`${environment.baseUrl}/api/v1/Category?pageSize=${pageSize}&pageNumber=${pageNum}`);
  }

}
