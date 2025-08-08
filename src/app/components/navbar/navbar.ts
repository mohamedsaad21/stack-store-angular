import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserAuth } from '../../services/user-auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  isUserLogged!:boolean
  constructor(private _userAuthSer:UserAuth,
    private _router:Router
  ){
    
  }
  ngOnInit(): void {
    this.isUserLogged = this._userAuthSer.getUserLogged();
    this._userAuthSer.getAuthSubject().subscribe({
      next:(status)=>{this.isUserLogged = status},
      error:(err)=>{console.log(err)}
    });
  }


  logout(){
    this._userAuthSer.logout();
    this._router.navigateByUrl(`/Home`);
  }

}
