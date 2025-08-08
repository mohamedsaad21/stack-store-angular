import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { IUserRegister } from '../models/iuser-register';
import { IUserLogin } from '../models/iuser-login';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthModel } from '../models/auth-model';

@Injectable({
  providedIn: 'root'
})
export class UserAuth {
  user!:AuthModel
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?:string;
  private authSubject:BehaviorSubject<boolean>;
  constructor(private _httpClient:HttpClient){
    this.authSubject = new BehaviorSubject<boolean>(this.getUserLogged());
  }

  register(user:IUserRegister):Observable<AuthModel>{
    return this._httpClient.post<AuthModel>(`${environment.baseUrl}/api/Auth/register`, user)
    .pipe(tap((response:AuthModel) => {this.doLoginUser(user.email, response.token)}));
  }

  login(user:IUserLogin):Observable<AuthModel>{
    return this._httpClient.post<AuthModel>(`${environment.baseUrl}/api/Auth/login`, user)
    .pipe(tap((response:AuthModel) => {this.doLoginUser(user.email, response.token)}));
  }

  getUserLogged():boolean{
    return localStorage.getItem(this.JWT_TOKEN)? true : false;
  }

  

    private doLoginUser(email:string, token:any){
      this.loggedUser = email;
      this.storeJwtToken(token);
      this.authSubject.next(true);
    }
    private storeJwtToken(jwt:string){
      localStorage.setItem(this.JWT_TOKEN, jwt);
    }

    logout(){
      localStorage.removeItem(this.JWT_TOKEN);
      this.authSubject.next(false);
    }

    getAuthSubject():BehaviorSubject<boolean>{
      return this.authSubject;
    }
}
