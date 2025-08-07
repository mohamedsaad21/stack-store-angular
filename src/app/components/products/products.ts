import { Component, OnInit } from '@angular/core';
import { Fetchproducts } from '../../services/fetchproducts';
import { Iproduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';
import * as AOS from 'aos';
import { Fetchcategories } from '../../services/fetchcategories';
import { Icategory } from '../../models/icategory';
import Swal from 'sweetalert2';
import { Cartitem } from '../../models/cartitem';
import { Fetchcart } from '../../services/fetchcart';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  products: Iproduct[] = [];
  categories: Icategory[] = [];
  filteredProducts: Iproduct[] = [];
  cartItem: Cartitem = {
    productId:1,
    count:1
  };
  constructor(
    private _Fetchproducts: Fetchproducts,
    private _Fetchcategories: Fetchcategories,
    private _Fetchcart:Fetchcart
  ) { }
  ngOnInit() {
    this.getProducts();
    this.getCategories();
    AOS.init();
  }

  getProducts() {
    this._Fetchproducts.getAllProducts(1, 7).subscribe({
      next: (res) => {
        this.products = res.result;
        this.filteredProducts = res.result;
      }
    })

  }

  getCategories() {
    this._Fetchcategories.getAllCategories(7, 1).subscribe({
      next: (res) => {
        this.categories = res.result;
      }
    })
  }

  filterProducts(catId?: number) {
    if (!catId) {
      this.getProducts();
    }
    this.filteredProducts = this.products.filter(prd => prd.categoryId == catId);
  }

  addToCart(Id:number) {
    this._Fetchcart.addProductToCart(this.cartItem).subscribe({
      next: (res) => {
        console.log(res);
      }
    })
  }
}
