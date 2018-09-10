import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { LandingComponent } from '../landing/landing.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { LogInComponent } from '../log-in/log-in.component';
import { TailorProfileComponent } from '../tailor-profile/tailor-profile.component';
import { TailorHomeComponent } from '../tailor-home/tailor-home.component';
import { AccountSettingsComponent} from '../account-settings/account-settings.component';
// import {SettingsComponent} from '../settings/settings.component';
// import {CustomizeComponent} from '../settings/customize/customize.component';
import {SettingsComponent} from '../settings/settings.component';
import {CustomizeComponent} from '../settings/customize/customize.component';
import { PostsComponent } from '../tailor-profile/posts/posts.component';
import { PostComponent } from '../tailor-profile/post/post.component';
import {ViewPostComponent} from '../tailor-profile/posts/view-post/view-post.component';
import {TailorJobComponent} from '../tailor-job/tailor-job.component';
import {TailorComponent} from '../tailor/tailor.component';

const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'index', component: LandingComponent},
  {path: 'login', component: LogInComponent},
  {path: 'register', component: SignUpComponent},
  // Tailor Routes
  {path: 'tailor', component: TailorComponent, children: [
      {path: 'home', component: TailorHomeComponent, children: [
          {path: 'profile', component: TailorProfileComponent, children: [
              {path: '', redirectTo: 'posts', pathMatch: 'full'},
              {path: 'posts', component: PostsComponent}
            ]},
        ]},
      {path: 'post/new', component: PostComponent},
      {path: 'post/:id', component: ViewPostComponent},
      {path: 'settings', component: SettingsComponent, children: [
          {path: '', redirectTo: 'customize', pathMatch: 'full'},
          {path: 'customize', component: CustomizeComponent},
          {path: 'account', component: AccountSettingsComponent}
        ]},
    ]},
  {path: 'post', component: PostComponent},
  {path: 'view-post/:id', component: ViewPostComponent}
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
