import { Component, OnInit } from '@angular/core';
import { Fetchcategories } from '../../services/fetchcategories';
import { Icategory } from '../../models/icategory';
import { Iproduct } from '../../models/iproduct';
import { FormsModule } from '@angular/forms';
import { Fetchproducts } from '../../services/fetchproducts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct implements OnInit {
  product:Iproduct = {} as Iproduct;
  categories:Icategory[] = [] as Icategory[];
  constructor(private _categorySer:Fetchcategories,
    private _productSer:Fetchproducts,
    private _router:Router
  ){
    this.product.categoryId = 0;
  }
  ngOnInit(): void {
    this._categorySer.getAllCategories(5, 1).subscribe({
      next:(res)=>{this.categories = res.result},
      error:(err)=>{console.log(err)}
    });
  }


  addPrd(){
    this._productSer.addProduct(this.product).subscribe({
      next:(res)=>{
        if(res.isSuccess){
          this._router.navigateByUrl(`/Products`);
        }
      },
      error:(err)=>{console.log(err)}
    });

  }
  onImagesSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.product.images = Array.from(input.files); // صح
    }
  }
}
