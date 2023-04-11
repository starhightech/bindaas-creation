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
    this.service.getBusiness().subscribe(response => {
      this.business = response['data'];
    });
    this.service.getProducts().subscribe(response => {
      this.items = response['data'];
      if (this.items) {
        this.isLoaded = true;
      }
    });
  }
}
