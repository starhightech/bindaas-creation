import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  submitted = false;
  public profile: any;
  public business: any;
  public items: any;
  public google_api_key: any;
  public mapUrl: any;

  constructor(
    private service: CommonService,
  ) { }

  ngOnInit() {
    this.google_api_key = environment.GOOGLE_MAPS_APIKEY;
    this.service.getProfile()
      .subscribe(response => {
        this.business = response['data']['business'];
        this.items = response['data']['business']['items'];
        this.items.length = 3;
        this.mapUrl = 'https://maps.google.com/maps?q='+this.business.latitude+','+this.business.longitude+'&hl=en;z=14&output=embed';
      });
  }
}
