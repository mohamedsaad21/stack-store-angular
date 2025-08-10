import { Component, OnInit } from '@angular/core';
import { UserAuth } from '../../services/user-auth';
import { Router, RouterLink } from '@angular/router';
import { Fetchproducts } from '../../services/fetchproducts';
import { Iproduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  products: Iproduct[] = [] as Iproduct[];
  constructor(
    private _userAuth: UserAuth,
    private _router: Router,
    private _Fetchproducts: Fetchproducts
  ) {

  }

  logout() {
    this._userAuth.logout();
    this._router.navigateByUrl('/Login');
  }

  ngOnInit() {
    this._Fetchproducts.getAllProducts(1, 10).subscribe({
      next: (res) => {
        this.products = res.result;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
