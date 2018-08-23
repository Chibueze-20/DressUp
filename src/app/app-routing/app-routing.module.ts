import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { LandingComponent } from '../landing/landing.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { LogInComponent } from '../log-in/log-in.component';
import { TailorProfileComponent } from '../tailor-profile/tailor-profile.component';
import { TailorHomeComponent } from '../tailor-home/tailor-home.component';
// import {SettingsComponent} from '../settings/settings.component';
// import {CustomizeComponent} from '../settings/customize/customize.component';

const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'index', component: LandingComponent},
  {path: 'login', component: LogInComponent},
  {path: 'register', component: SignUpComponent},
  {path: 'profile', component: TailorProfileComponent},
  {path: 'home', component: TailorHomeComponent},
  // {path: 'settings', component: SettingsComponent, children: [
    // {path: '', redirectTo: 'customize', pathMatch: 'full'},
    // {path: 'customize', component: CustomizeComponent}
  // ]}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule] ,
  declarations: []
})
export class AppRoutingModule { }
