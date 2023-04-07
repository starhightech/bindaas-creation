import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Products } from 'src/app/interface/product';
import { ProductsService } from 'src/app/services/product.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  id!: number;
  product!: Products;
  form!: FormGroup;
  productLoaded: boolean = false;
  public business_type: any;
  public business_headcat: any;
  public categories: any;
  public brands: any;

  constructor(
    private service: CommonService,
    public productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
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
    this.id = this.route.snapshot.params['id'];
    this.productLoaded = false;
    this.productService.find(this.id).subscribe(data => {
      this.product = data['data'];
      if (this.product) {
        this.productLoaded = true;
      }
    });
    this.service.getCategoriesByHeadcat()
      .subscribe(response => {
        this.categories = response['data']['business']['categories'];
      });
    this.service.getBrands()
      .subscribe(response => {
        this.brands = response['data'];
      });


    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      category_id: new FormControl('', Validators.required),
      brand: new FormControl(),
      price: new FormControl(),
      content: new FormControl(),
      has_discount: new FormControl(),
      discount: new FormControl(),
      condition: new FormControl(),
      status: new FormControl()
    });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  get f() {
    return this.form.controls;
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  submit() {
    this.productService.update(this.id, this.form.value, this.business_type).subscribe((res: any) => {
      this.toastr.success("Product updated successfully!");
      this.router.navigateByUrl('account/product/index');
    })
  }

  isDiscountFieldDisplayed: boolean = false;
  showDiscountField() {
    this.isDiscountFieldDisplayed = !this.isDiscountFieldDisplayed;
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '200px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'calibri', name: 'Calibri' },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['undo', 'redo', 'strikeThrough', 'subscript', 'superscript'],
      ['fontSize', 'insertImage', 'insertVideo', 'textColor', 'backgroundColor', 'customClasses', 'insertHorizontalRule']
    ]
  };

}
