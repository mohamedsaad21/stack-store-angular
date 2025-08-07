import { Component } from '@angular/core';
import { Fetchcart } from '../../services/fetchcart';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  constructor(private _Fetchcart:Fetchcart){  }
}
