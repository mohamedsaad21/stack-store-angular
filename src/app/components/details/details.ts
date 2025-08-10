import { Component, OnInit } from '@angular/core';
import { Fetchproducts } from '../../services/fetchproducts';
import { Iproduct } from '../../models/iproduct';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Fetchcart } from '../../services/fetchcart';
import { Cartitem } from '../../models/cartitem';
import { UserAuth } from '../../services/user-auth';
import { Observable } from 'rxjs';
import { selectRoles } from '../../store/role.selector';
import { AuthState } from '../../store/role.reducer';
import { Store } from '@ngrx/store';
@Component({
  // 
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit {

  Roles$!:Observable<string[]>
  roles:string[] = [] as string[]
    
  product: Iproduct = {} as Iproduct;
  productId:number = 0;

  constructor(
    private _Fetchproducts: Fetchproducts,
    private _Fetchcart:Fetchcart,
    private _ActivatedRoute: ActivatedRoute,
    private _Router:Router,
    private _userAuthSer:UserAuth,
    private store:Store<{auth:AuthState}>
  ) { }

  ngOnInit() {
    this.Roles$ = this.store.select(selectRoles);
        this.Roles$.subscribe(val => {
          this.roles = val
        });

    this.productId = Number(this._ActivatedRoute.snapshot.paramMap.get('id'));

    if (this.productId) {
      this._Fetchproducts.getProductById(this.productId).subscribe({
        next: (res) => {
          this.product = res.result;
          console.log('Product:', this.product);
        },
        error: (err) => {
          console.error('Error fetching product:', err);
        }
      });
    }
  }


  
addToCart(product: Iproduct) {
  this._Fetchcart.getCartProducts(7, 1).subscribe({
    next: (res) => {
      const exists = res.result.some((item: any) => item.productId === product.id);

      if (exists) {
        Swal.fire({
          icon: 'info',
          title: 'Already in cart',
          text: `${product.name} is already in your cart.`,
          showConfirmButton: true
        }).then(() => {
          this._Router.navigate(['/Cart'])
        });
        return;
      }

      const cartItem: Cartitem = {
        productId: product.id,
        productName: product.name,
        imageUrl: product.images[0],
        quantity: 1,
        unitPrice: product.price
      };

      this._Fetchcart.addProductToCart(cartItem).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Added to cart',
            text: `${product.name} added successfully!`,
            showConfirmButton: true
          }).then(() => {
            this._Router.navigate(['/Cart']);
          })
          
          console.log(res);
        },
        error: (err) => {
          console.error('Error:', err);
          Swal.fire({
            icon: 'error',
            title: 'Failed to add to cart',
            text: err.error?.message || 'Something went wrong'
          });
        }
      });
    },
    error: (err) => console.error('Error fetching cart:', err)
  });


  
 
}



  navigateToUpdate(id:number){
    this._Router.navigateByUrl(`/UpdateProduct/${id}`);
  }

deletePrd(id: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This product will be deleted permanently!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this._Fetchproducts.deleteProduct(id).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The product has been deleted successfully.',
            showConfirmButton: false,
            timer: 1500
          });
          this._Router.navigateByUrl(`/Products`);
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Failed!',
            text: 'Something went wrong while deleting the product.'
          });
        }
      });
    }
  });
}


}

