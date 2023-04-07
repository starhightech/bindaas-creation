import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/product.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class ProductCreateComponent implements OnInit {
  public business_type: any;
  public business_headcat: any;
  public categories: any;
  public category_id: any;
  public brands: any;
  form!: FormGroup;
  files: File[] = [];

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    private service: CommonService,
    public productService: ProductsService,
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
    if (typehash) {
      this.business_type = this.service.decrypt(typehash);
    }
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
      has_discount: new FormControl(false),
      discount: new FormControl(),
      condition: new FormControl(),
      status: new FormControl('publish'),
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
    this.productService.create(this.form.value, this.business_type, this.files).subscribe((res: any) => {
      this.toastr.success("Product created successfully!");
      this.router.navigateByUrl('account/product/index');
    })
  }

  isDiscountFieldDisplayed: boolean = false;
  showDiscountField() {
    this.isDiscountFieldDisplayed = !this.isDiscountFieldDisplayed;
  }

  onSelect(event: any) {
    event.rejectedFiles.forEach((data: File) => {
      this.toastr.warning(data.name + " exceeds file size 2MB");
    })
    event.addedFiles.forEach((element: File) => {
      if (this.files.length <= 4) {
        this.files.push(element);
      } else {
        this.toastr.warning("Only 5 images can be uploaded!");
      }
    });
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
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
