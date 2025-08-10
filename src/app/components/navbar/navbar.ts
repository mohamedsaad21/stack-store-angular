import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserAuth } from '../../services/user-auth';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../store/role.reducer';
import { selectRoles } from '../../store/role.selector';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  isUserLogged!:boolean;
  Roles$!:Observable<string[]>
  roles:string[] = [] as string[]
  constructor(private _userAuthSer:UserAuth,
    private _router:Router,
    private store:Store<{auth:AuthState}>
  ){

  }
  ngOnInit(): void {
    this.isUserLogged = this._userAuthSer.getUserLogged();
    this._userAuthSer.getAuthSubject().subscribe({
      next:(status)=>{this.isUserLogged = status},
      error:(err)=>{console.log(err)}
    });

    this.Roles$ = this.store.select(selectRoles);
    this.Roles$.subscribe(val => {
      this.roles = val
    });
    
  }


  logout(){
    this._userAuthSer.logout();
    this._router.navigateByUrl(`/Home`);
  }

}
