import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from '../landing/landing.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { LogInComponent } from '../log-in/log-in.component';
import { SettingsComponent } from '../settings/settings.component';
import { AccountSettingsComponent } from '../account-settings/account-settings.component';
import { TailorComponent } from '../tailor/tailor.component';
import { TailorHomeComponent } from '../tailor-home/tailor-home.component';
import { TailorJobComponent } from '../tailor-job/tailor-job.component';
import { TailorProfileComponent } from '../tailor-profile/tailor-profile.component';
import { CustomizeComponent } from '../settings/customize/customize.component';
import { PostsComponent } from '../tailor-profile/posts/posts.component';
import { PostComponent } from '../tailor-profile/post/post.component';
import { ViewPostComponent } from '../tailor-profile/posts/view-post/view-post.component';
import { UserComponent } from '../user/user.component';
import { UserHomeComponent } from '../user/user-home/user-home.component';
import { TailorFeedsComponent } from '../user/tailor-feeds/tailor-feeds.component';
import { RequestComponent } from '../user/request/request.component';
import { TailorSearchComponent } from '../user/tailor-search/tailor-search.component';
import {BidViewComponent} from '../bid-view/bid-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: LandingComponent },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: SignUpComponent },
  // Tailor Routes
  {
    path: 'tailor', component: TailorComponent, children: [
      {
        path: 'home', component: TailorHomeComponent, children: [
          { path: '', redirectTo: 'jobs', pathMatch: 'full' },
          { path: 'jobs', component: TailorJobComponent },
          {
            path: 'profile', component: TailorProfileComponent, children: [
              { path: '', redirectTo: 'posts', pathMatch: 'full' },
              { path: 'posts', component: PostsComponent }
            ]
          },
        ]
      },
      { path: 'post/new', component: PostComponent },
      {path: 'job', children: [
          {path: 'view/:id', component: BidViewComponent}
        ]
      },
      {
        path: 'settings', component: SettingsComponent, children: [
          { path: '', redirectTo: 'customize', pathMatch: 'full' },
          { path: 'customize', component: CustomizeComponent },
          { path: 'account', component: AccountSettingsComponent }
        ]
      },
    ]
  },
  { path: 'post', component: PostComponent },
  { path: 'view-post', component: ViewPostComponent },
  { path: 'bid-view', component: BidViewComponent},
  // User Routes
  {path: 'user', component: UserComponent, children: [
      {path: 'home', component: UserHomeComponent, children: [
          { path: '', redirectTo: 'feeds', pathMatch: 'full' },
          { path: 'feeds', component: TailorFeedsComponent }
        ]
      },
      {path: 'new', children: [
          { path: 'order', component: RequestComponent }
        ]
      },
      { path: 'tailor/:id', component: TailorProfileComponent },
      {path: 'view', children: [
          { path: 'order/:id', component: ViewPostComponent }
        ]
      },
      {path: 'settings', component: SettingsComponent, children: [
        { path: 'account', component: AccountSettingsComponent },
        { path: '', redirectTo: 'account', pathMatch: 'full' }
      ]
    }
    ]
  },
  { path: 'search', component: TailorSearchComponent }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
