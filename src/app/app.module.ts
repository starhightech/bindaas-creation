import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './components/account/layouts/main.component';
import { SidebarComponent } from './components/account/layouts/sidebar.component';
import { DashboardComponent } from './components/account/dashboard/dashboard.component';
import { BusinessComponent } from './components/account/business/business.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { SettingsComponent } from './components/account/settings/settings.component';
import { ProductIndexComponent } from './components/account/product/index/index.component';
import { ProductCreateComponent } from './components/account/product/create/create.component';
import { ProductViewComponent } from './components/account/product/view/view.component';
import { ProductUpdateComponent } from './components/account/product/update/update.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule, ToastContainerModule } from 'ngx-toastr';
import { ProductComponent } from './components/product/product.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { IgxCarouselModule } from 'igniteui-angular';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { ServiceComponent } from './components/service/service.component';
import { ErrorComponent } from './components/error/error.component';
import { ReviewComponent } from './components/review/review.component';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    MainComponent,
    SidebarComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    BusinessComponent,
    ProfileComponent,
    SettingsComponent,
    ProductIndexComponent,
    ProductCreateComponent,
    ProductViewComponent,
    ProductUpdateComponent,
    ProductComponent,
    ContactComponent,
    AboutComponent,
    ServiceComponent,
    ErrorComponent,
    ReviewComponent,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HammerModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    AngularEditorModule,
    ToastrModule.forRoot(), // ToastrModule added
    ToastNoAnimationModule.forRoot(),
    ToastContainerModule,
    NgxDropzoneModule,
    IgxCarouselModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
