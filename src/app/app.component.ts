import { Component, OnInit } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string | undefined;
  public profile: any;
  public business: any;
  public items: any;

  constructor(private service: CommonService) { }

  ngOnInit() {
    this.service.getBusiness().subscribe(response => {
      this.business = response['data'];
    });
    this.service.getProducts().subscribe(response => {
      this.items = response['data'];
    });
  }
}
