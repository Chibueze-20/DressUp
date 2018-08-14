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

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignUpComponent,
    ConfirmPasswordDirective,
    LogInComponent
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
