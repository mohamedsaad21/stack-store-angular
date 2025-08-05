import { Component } from '@angular/core';
import { UserAuth } from '../../services/user-auth';
import { FormsModule } from '@angular/forms';
import { IUserLogin } from '../../models/iuser-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  isUserLogged:boolean;
  user:IUserLogin = {} as IUserLogin;
  constructor(private _userAuthSer:UserAuth,
    private _router:Router
  ){
    this.isUserLogged = _userAuthSer.getUserLogged();
  }


  login(){
    this._userAuthSer.login(this.user).subscribe({
      next:(res)=>{this.isUserLogged = res.isAuthenticated},
      error:(err)=>{console.log(err)}
    });
    if(this.isUserLogged){
      this._router.navigateByUrl('/Home');
    }
  }


}
