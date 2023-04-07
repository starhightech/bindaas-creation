import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  public items: any;
  public business: any;
  public isLoaded: boolean = false;

  constructor(
    private service: CommonService,
  ) { }

  ngOnInit(): void {
    this.service.getProfile()
      .subscribe(response => {
        this.business = response['data']['business'];
        this.items = response['data']['business']['items'];
        if (this.items) {
          this.isLoaded = true;
        }
      });
  }
}
