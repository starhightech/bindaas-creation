import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  submitted = false;
  public business: any;

  contactForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    subject: new FormControl(''),
    message: new FormControl(''),
  });

  constructor(
    private service: CommonService,
    public formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.service.getBusiness()
      .subscribe(response => {
        this.business = response['data'];
      });

    this.contactForm = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
          ]
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],
        subject: [
          '',
          [
            Validators.required,
          ]
        ],
        message: [
          '',
          [
            Validators.required,
          ]
        ],
      },
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.contactForm.controls;
  }

  onContact() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    this.service.contact(this.contactForm.value, this.business.id).subscribe((res: any) => {
      this.toastr.success('Your message has been sent. Thank you!');
      window.location.reload();
    })
  }
}
