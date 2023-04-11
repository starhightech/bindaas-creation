import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public profile: any;
  public business: any;
  public items: any;
  public google_api_key: any;

  constructor(private service: CommonService) { }

  ngOnInit() {
    // this.service.getProfile()
    //   .subscribe(response => {
    //     this.profile = response['data'];
    //     this.business = response['data']['business'];
    //     this.items = response['data']['business']['items'];
        // sessionStorage.setItem('userhash', this.service.encrypt(response['data']['id']));
    //     sessionStorage.setItem('idhash', this.service.encrypt(response['data']['business']['id']));
    //     sessionStorage.setItem('typehash', this.service.encrypt(response['data']['business']['type']));
    //   });

    this.service.getBusiness().subscribe(response => {
      this.business = response['data'];
      sessionStorage.setItem('idhash', this.service.encrypt(response['data']['id']));
      sessionStorage.setItem('typehash', this.service.encrypt(response['data']['type']));
    });
    this.service.getProducts().subscribe(response => {
      this.items = response['data'];
    });
  }
}
