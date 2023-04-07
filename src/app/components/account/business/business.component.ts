import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { UploadService } from 'src/app/services/upload.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  imageUploading: boolean = false;
  form!: FormGroup;
  public profile: any;
  public business: any;
  public items: any;
  public file!: File;
  public google_api_key: any;
  businessLoaded: boolean = false;
  public cities: any;

  constructor(
    private service: CommonService,
    private uploadService: UploadService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.google_api_key = environment.GOOGLE_MAPS_APIKEY;
    this.businessLoaded = false;
    this.service.getProfile()
      .subscribe(response => {
        this.business = response['data']['business'];
        if (this.business) {
          this.businessLoaded = true;
        }
      });
    this.service.getCities()
      .subscribe(response => {
        this.cities = response['data'];
      });

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      slogan: new FormControl(),
      content: new FormControl(),
      city: new FormControl('', [Validators.required]),
      location: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      mobile: new FormControl(),
      whatsapp_phone: new FormControl(),
      latitude: new FormControl(),
      longitude: new FormControl(),
      opening_sunday: new FormControl(),
      opening_monday: new FormControl(),
      opening_tuesday: new FormControl(),
      opening_wednesday: new FormControl(),
      opening_thursday: new FormControl(),
      opening_friday: new FormControl(),
      opening_saturday: new FormControl(),
      link_website: new FormControl(),
      link_facebook: new FormControl(),
      link_twitter: new FormControl(),
      link_youtube: new FormControl(),
      link_instagram: new FormControl(),
      link_linkedin: new FormControl(),
      link_tiktok: new FormControl(),
      link_pinterest: new FormControl(),
    });
  }

  onUpdate() {
    this.service.updateBusiness(this.form.value, this.business.id).subscribe((res: any) => {
      this.toastr.success('Business updated successfully!');
      this.router.navigateByUrl('account/business');
    })
  }

  uploadImage(event: any) {
    this.imageUploading = true;
    this.file = event.target.files[0];
    if (this.file) {
      this.uploadService.uploadfileBusiness(this.file).subscribe(resp => {
        this.imageUploading = false;
        this.toastr.success('Media uploaded successfully!');
        window.location.reload();
      })
    }
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '200px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'calibri', name: 'Calibri' },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['undo', 'redo', 'strikeThrough', 'subscript', 'superscript'],
      ['fontSize', 'insertImage', 'insertVideo', 'textColor', 'backgroundColor', 'customClasses', 'insertHorizontalRule']
    ]
  };
}
