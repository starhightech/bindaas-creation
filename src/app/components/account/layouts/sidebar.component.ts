import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public profile: any;
  public business_type: any;
  constructor(private service: CommonService, public authService: AuthService) { }

  ngOnInit(): void {
    var typehash = sessionStorage.getItem('typehash')!;
    this.business_type = "Product";
    if (typehash) {
      this.business_type = this.service.decrypt(typehash);
    }

    this.service.getProfile()
      .subscribe(response => {
        this.profile = response['data'];
      });
  }

  public onLogout() {
    if (confirm("Are you sure you want to log out ?")) {
      this.authService.logout();
    }
  }
}
