import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
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
          this.isLoaded = true;
        }
      });
  }
}
