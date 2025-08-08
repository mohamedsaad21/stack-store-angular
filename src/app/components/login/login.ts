import { Component } from '@angular/core';
import { UserAuth } from '../../services/user-auth';
import { FormsModule } from '@angular/forms';
import { IUserLogin } from '../../models/iuser-login';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  isUserLogged:boolean;
  errorMessages!:string
  user:IUserLogin = {} as IUserLogin;
  constructor(private _userAuthSer:UserAuth,
    private _router:Router
  ){
    this.isUserLogged = _userAuthSer.getUserLogged();
  }


  login(){
    this._userAuthSer.login(this.user).subscribe({
      next:(res)=>{
        this.isUserLogged = res.isAuthenticated;
        this._userAuthSer.user = res;
        if(this.isUserLogged){
          this._router.navigateByUrl('/Home');
        }
      },
      error:(err)=>{this.errorMessages = err.error;console.log(err)}
    });
  }


}
