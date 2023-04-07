import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { ProductsService } from 'src/app/services/product.service';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';

defineComponents(IgcRatingComponent);


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  submitted = false;
  public productLoaded: boolean = false;
  public product: any;
  public reviews: any;
  public reviewsLoaded: boolean = false;
  public business: any;
  public rating: any;
  public images: any;
  public imagesLoaded: boolean = false;


  reviewForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    review: new FormControl(''),
  });

  constructor(
    private activatedroute: ActivatedRoute,
    private service: ProductsService,
    private commonService: CommonService,
    public formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.productLoaded = false;
    this.reviewsLoaded = false;
    this.activatedroute.paramMap.subscribe((params) => {
      this.service.find(params.get('slug'))
        .subscribe(response => {
          this.product = response['data'][0];
          if (this.product) {
            this.productLoaded = true;
            this.service.getReviews(this.product.id).subscribe(response => {
              this.reviews = response['data'];
              this.reviewsLoaded = true;
            });
            this.service.getImages(this.product.id).subscribe(response => {
              this.images = response['data'];
              this.imagesLoaded = true;
            });
          }
        });
    });
    this.commonService.getProfile()
      .subscribe(response => {
        this.business = response['data']['business'];
      });

    this.reviewForm = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
          ]
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],
        review: [
          '',
          [
            Validators.required,
          ]
        ],
      },
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.reviewForm.controls;
  }
  ratingChanged(event: any) {
    this.rating = event.target.value
  }
  onReview() {
    this.submitted = true;
    if (this.reviewForm.invalid) {
      return;
    }
    this.service.createReview(this.reviewForm.value, this.rating, this.product.id).subscribe((res: any) => {
      this.toastr.success('Thank you for posting your valuable review!');
      window.location.reload();
    })
  }
}
