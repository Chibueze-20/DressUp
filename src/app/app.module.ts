import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ConfirmPasswordDirective } from './shared/confirm-password.directive';
import { LogInComponent } from './log-in/log-in.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { UserserviceService } from './userservice.service';
import { TailorHomeComponent } from './tailor/tailor-home/tailor-home.component';
import { TailorJobComponent } from './tailor/tailor-job/tailor-job.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { TailorProfileComponent } from './tailor/tailor-profile/tailor-profile.component';
import { BidViewComponent } from './bid-view/bid-view.component';
import { SettingsComponent } from './settings/settings.component';
import { CustomizeComponent } from './settings/customize/customize.component';
import { PostsComponent } from './tailor/tailor-profile/posts/posts.component';
import { DirectOrderComponent } from './tailor/tailor-profile/direct-order/direct-order.component';
import { PostComponent } from './tailor/tailor-profile/post/post.component';
import { ViewPostComponent } from './user/view-post/view-post.component';
import { TailorComponent } from './tailor/tailor.component';
import { ExtensionsPipe } from './extensions.pipe';
import { UserComponent } from './user/user.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { TailorFeedsComponent } from './user/tailor-feeds/tailor-feeds.component';
import { RequestComponent } from './user/request/request.component';
import { TailorSearchComponent } from './user/tailor-search/tailor-search.component';
import { TailorPostsComponent } from './user/tailor-posts/tailor-posts.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RequestNotificationsComponent } from './notifications/request-notifications/request-notifications.component';
import { AccountNotificationsComponent } from './notifications/account-notifications/account-notifications.component';
import {RavepaymentModule} from './shared/ravepayment/ravepayment.module';
import { ChatRoomComponent } from './chat/chat-room/chat-room.component';
import { ChatComponent } from './chat/chat.component';
import { ChatListComponent } from './chat/chat-list/chat-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignUpComponent,
    ConfirmPasswordDirective,
    LogInComponent,
    TailorHomeComponent,
    TailorJobComponent,
    AccountSettingsComponent,
    TailorProfileComponent,
    BidViewComponent,
    SettingsComponent,
    CustomizeComponent,
    PostsComponent,
    DirectOrderComponent,
    PostComponent,
    ViewPostComponent,
    TailorComponent,
    ExtensionsPipe,
    UserComponent,
    UserHomeComponent,
    TailorFeedsComponent,
    RequestComponent,
    TailorSearchComponent,
    TailorPostsComponent,
    NotificationsComponent,
    RequestNotificationsComponent,
    AccountNotificationsComponent,
    ChatRoomComponent,
    ChatComponent,
    ChatListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RavepaymentModule
  ],
  providers: [UserserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
