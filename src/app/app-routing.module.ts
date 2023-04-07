import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessComponent } from './components/account/business/business.component';
import { DashboardComponent } from './components/account/dashboard/dashboard.component';
import { MainComponent } from './components/account/layouts/main.component';
import { ProductCreateComponent } from './components/account/product/create/create.component';
import { ProductIndexComponent } from './components/account/product/index/index.component';
import { ProductUpdateComponent } from './components/account/product/update/update.component';
import { ProductViewComponent } from './components/account/product/view/view.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { SettingsComponent } from './components/account/settings/settings.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductComponent } from './components/product/product.component';
import { ContactComponent } from './components/contact/contact.component';
import { ServiceComponent } from './components/service/service.component';
import { AboutComponent } from './components/about/about.component';
import { ErrorComponent } from './components/error/error.component';
import { ReviewComponent } from './components/review/review.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'service',
    component: ServiceComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'review',
    component: ReviewComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'account',
    canActivate: [AuthGuard],
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'business',
        component: BusinessComponent,
      },
      {
        path: 'product',
        component: ProductIndexComponent
      },
      {
        path: 'product/index',
        component: ProductIndexComponent
      },
      {
        path: 'product/:id/view',
        component: ProductViewComponent,
      },
      {
        path: 'product/create',
        component: ProductCreateComponent,
      },
      {
        path: 'product/:id/update',
        component: ProductUpdateComponent,
      },

      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'setting',
        component: SettingsComponent,
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: ':slug',
    component: ProductComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
