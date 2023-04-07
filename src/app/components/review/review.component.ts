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
    this.service.getProfile()
      .subscribe(response => {
        this.business = response['data']['business'];
        if (this.business) {
          this.service.getReviews(this.business.id)
            .subscribe(response => {
              this.reviews = response['data'];
              if(this.reviews){
                this.isLoaded =true;
              }
            });
        }
      });
  }
}
