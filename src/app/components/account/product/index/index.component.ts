import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/interface/product';
import { CommonService } from 'src/app/services/common.service';
import { ProductsService } from 'src/app/services/product.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class ProductIndexComponent implements OnInit {
  public business_type: any;
  products: Products[] = [];
  productLoaded: boolean = false;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    private service: CommonService,
    public productService: ProductsService,
    private toastr: ToastrService
  ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    var typehash = sessionStorage.getItem('typehash')!;
    this.business_type = "Product";
    this.productLoaded = false;
    if (typehash) {
      this.business_type = this.service.decrypt(typehash);
    }
    this.productService.getAll().subscribe(data => {
      this.products = data['data'];
      if (this.products) {
        this.productLoaded = true;
      }
    })
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  deleteProduct(id: number) {
    if (confirm("Are you sure you want to delete this item ?")) {
      this.productService.delete(id).subscribe(res => {
        this.products = this.products.filter(item => item.id !== id);
        this.toastr.warning('Product deleted successfully!');
      })
    }
  }

}
