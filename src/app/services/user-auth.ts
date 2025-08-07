import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { IUserRegister } from '../models/iuser-register';
import { IUserLogin } from '../models/iuser-login';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthModel } from '../models/auth-model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserAuth {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?:string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  constructor(private _httpClient:HttpClient,
    private _cookieService:CookieService
  ){

  }

  register(user:IUserRegister):Observable<AuthModel>{
    return this._httpClient.post<AuthModel>(`${environment.baseUrl}/api/Auth/register`, user);
  }

  login(user:IUserLogin):Observable<AuthModel>{
    return this._httpClient.post<AuthModel>(`${environment.baseUrl}/api/Auth/login`, user)
    .pipe(tap((response:AuthModel) => this.doLoginUser(user.email, response.token)));
  }

  getUserLogged():boolean{
    return this._cookieService.get('refreshToken')? true : false;
  }

  

    private doLoginUser(email:string, token:any){
      this.loggedUser = email;
      this.storeJwtToken(token);
      this.isAuthenticatedSubject.next(true);
    }
    private storeJwtToken(jwt:string){
      localStorage.setItem(this.JWT_TOKEN, jwt);
    }

    logout(){
      localStorage.removeItem(this.JWT_TOKEN);
      this.isAuthenticatedSubject.next(false);
    }
}
