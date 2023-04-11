import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  public reviews: any;
  public business: any;
  public isLoaded: boolean = false;
  constructor(
    private service: CommonService,
  ) { }
  ngOnInit(): void {
    this.service.getBusiness()
      .subscribe(response => {
        this.business = response['data'];
        if (this.business) {
          this.service.getReviews()
            .subscribe(response => {
              this.reviews = response['data'];
              if (this.reviews) {
                this.isLoaded = true;
              }
            });
        }
      });
  }
}
