import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ConfirmPasswordDirective } from './sign-up/confirm-password.directive';
import { LogInComponent } from './log-in/log-in.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { UserserviceService } from './userservice.service';
import { TailorHomeComponent } from './tailor-home/tailor-home.component';
import { TailorProfileComponent } from './tailor-profile/tailor-profile.component';
import { SettingsComponent } from './settings/settings.component';
import { CustomizeComponent } from './settings/customize/customize.component';
import { PostsComponent } from './tailor-profile/posts/posts.component';
import { DirectOrderComponent } from './tailor-profile/direct-order/direct-order.component';
import { PostComponent } from './tailor-profile/post/post.component';
import { ViewPostComponent } from './posts/view-post/view-post.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignUpComponent,
    ConfirmPasswordDirective,
    LogInComponent,
    TailorHomeComponent,
    TailorProfileComponent,
    SettingsComponent,
    CustomizeComponent,
    PostsComponent,
    DirectOrderComponent,
    PostComponent,
    ViewPostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [UserserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
