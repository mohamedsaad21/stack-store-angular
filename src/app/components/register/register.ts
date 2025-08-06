import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IUserRegister } from '../../models/iuser-register';
import { UserAuth } from '../../services/user-auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  isUserRegistered:boolean;
  confirmPassword!:string
  user:IUserRegister = {} as IUserRegister;
  constructor(private _userAuthSer:UserAuth,
    private _router:Router,
  ){
    this.isUserRegistered = false;
  }
  

  register(){
    this._userAuthSer.register(this.user).subscribe({
      next:(res)=>{
        this.isUserRegistered = res.isAuthenticated;
        if(this.isUserRegistered){
          this._router.navigateByUrl(`/Home`);
        }
      },
      error:(err)=>{console.log(err)}
    });
  }
}
