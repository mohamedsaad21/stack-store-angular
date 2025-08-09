import { Component, OnInit } from '@angular/core';
import { Fetchcart } from '../../services/fetchcart';
import { Cartitem } from '../../models/cartitem';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { DeleteItem } from '../../models/delete-item';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  cartItems: DeleteItem[] = [];
  prices: number[] = [];

  constructor(private _Fetchcart: Fetchcart) {

  }

  ngOnInit() {
    this._Fetchcart.getCartProducts(7, 1).subscribe({
      next: (res) => {
        this.cartItems = res.result;

        if (!this.cartItems || this.cartItems.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'Your cart is empty',
            text: 'Looks like you haven’t added any items yet.',
            timer: 2000,
            showConfirmButton: false
          });
        }
      },
      error: (err) => {
        console.error('Error fetching cart:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load cart items'
        });
      }
    });
    console.log(this.cartItems);

  }

  deleteFromCart(cartItemId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This item will be removed from your cart.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    })
      .then((result) => {
        if (result.isConfirmed) {
          this._Fetchcart.deleteCartItem(cartItemId).subscribe({
            next: (res) => {
              console.log(res);
              this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);

              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'The item has been removed from your cart.',
                timer: 2000,
                showConfirmButton: false
              });
            },
            error: (err) => {
              console.error(err);
              Swal.fire({
                icon: 'error',
                title: 'Delete Failed',
                text: err.error?.message || 'Something went wrong'
              });
            }
          });
        }
      });

  }

  getTotalPrice() {
    this.prices = this.cartItems.map((item: Cartitem) => item.unitPrice);
    let total = 0;
    for (let i = 0; i < this.prices.length; i++) {
      total += this.prices[i];
    }

    return total;
  }

  // increase(cartItemId: number) {
  //   this._Fetchcart.increaseQuantity(cartItemId).subscribe({
  //     next: (res) => {
  //       const item = this.cartItems.find(i => i.id === cartItemId);
  //       if (item) {
  //         item.quantity++;
  //       }
  //     },
  //     error: (err) => console.error(err)
  //   });
  // }

  // decrease(cartItemId: number) {
  //   this._Fetchcart.decreaseQuantity(cartItemId).subscribe({
  //     next: (res) => {
  //       const item = this.cartItems.find(i => i.id === cartItemId);
  //       if (item && item.quantity > 1) {
  //         item.quantity--;
  //       }
  //     },
  //     error: (err) => console.error(err)
  //   });
  // }


}   
