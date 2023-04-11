import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UploadService } from 'src/app/services/upload.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  imageUploading: boolean = false;
  public file!: File;
  form!: FormGroup;
  public profile: any;
  public business: any;
  public items: any;
  public google_api_key: any;
  profileLoaded: boolean = false;

  constructor(
    private service: CommonService,
    private profileService: ProfileService,
    private uploadService: UploadService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.google_api_key = environment.GOOGLE_MAPS_APIKEY;
    this.profileLoaded = false;
    this.service.getProfile()
      .subscribe(response => {
        this.profile = response['data'];
        sessionStorage.setItem('userhash', this.service.encrypt(response['data']['id']));
        if (this.profile) {
          this.profileLoaded = true;
        }
      });

    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      mobile: new FormControl(),
      first_name: new FormControl(),
      middle_name: new FormControl(),
      last_name: new FormControl(),
      display_name: new FormControl(),
      gender: new FormControl(),
      email: new FormControl('', Validators.required),
      location: new FormControl()
    });
  }

  onUpdate() {
    this.profileService.update(this.form.value).subscribe((res: any) => {
      this.toastr.success('Profile updated successfully!');
      this.router.navigateByUrl('account/dashboard');
    })
  }
  uploadImage(event: any) {
    this.imageUploading = true;
    this.file = event.target.files[0];
    if (this.file) {
      this.uploadService.uploadfileProfile(this.file).subscribe(resp => {
        this.imageUploading = false;
        this.toastr.success("Profile Media Uploaded!");
        window.location.reload();
      })
    }
  }
}
