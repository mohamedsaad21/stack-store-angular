import { Component } from '@angular/core';
import { Fetchcategories } from '../../services/fetchcategories';
import { Fetchproducts } from '../../services/fetchproducts';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from '../../models/iproduct';
import { Icategory } from '../../models/icategory';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  imports: [FormsModule],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css'
})
export class UpdateProduct {
  product:Iproduct = {} as Iproduct;
  categories:Icategory[] = [] as Icategory[];
  currentProductId:number=0;
  constructor(private _categorySer:Fetchcategories,
    private _productSer:Fetchproducts,
    private _router:Router,
    private _activatedRoute:ActivatedRoute
  ){
    this.product.categoryId = 0;
  }
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(paramMap=>{
      this.currentProductId = Number(paramMap.get('id'));
      console.log(this.currentProductId);
      
    });
    this._productSer.getProductById(this.currentProductId).subscribe({
      next:(res)=>{this.product = res.result;console.log(res.result);
      },
      error:(err)=>{console.log(err)}
    });
    this._categorySer.getAllCategories(5, 1).subscribe({
      next:(res)=>{this.categories = res.result},
      error:(err)=>{console.log(err)}
    });
  }


  UpdatePrd(){
    this._productSer.updateProduct(this.product.id, this.product).subscribe({
      next:(res)=>{
        if(res.isSuccess){
          this._router.navigateByUrl(`/Details/${this.product.id}`);
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
