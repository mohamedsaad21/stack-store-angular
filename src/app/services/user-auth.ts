import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { IUserRegister } from '../models/iuser-register';
import { IUserLogin } from '../models/iuser-login';
import { Observable } from 'rxjs';
import { AuthModel } from '../models/auth-model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserAuth {
  
  constructor(private _httpClient:HttpClient,
    private _cookieService:CookieService
  ){

  }

  register(user:IUserRegister):Observable<AuthModel>{
    return this._httpClient.post<AuthModel>(`${environment.baseUrl}/api/Auth/register`, user);
  }

  login(user:IUserLogin):Observable<AuthModel>{
    return this._httpClient.post<AuthModel>(`${environment.baseUrl}/api/Auth/login`, user)
  }

  getUserLogged():boolean{
    return this._cookieService.get('refreshToken')? true : false;
  }

  logout(){
    this._httpClient.post(`${environment.baseUrl}/api/Auth/revokeToken`,
      this._cookieService.get('refreshToken'));
    }

}
