import { Component } from '@angular/core';
import { UserAuth } from '../../services/user-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  constructor(private _userAuth:UserAuth,
    private _router:Router
  ){

  }

  logout(){
    this._userAuth.logout();
    this._router.navigateByUrl('/Login');
  }
}
