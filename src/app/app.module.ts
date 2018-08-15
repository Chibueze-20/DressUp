import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import {HttpClientModule} from '@angular/common/http';
=======
>>>>>>> d975a58df8a4f951badebef0d87f2098da57b07e

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SignUpComponent } from './sign-up/sign-up.component';
<<<<<<< HEAD
import { ConfirmPasswordDirective } from './sign-up/confirm-password.directive';
import { LogInComponent } from './log-in/log-in.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { UserserviceService } from './userservice.service';
import { TailorHomeComponent } from './tailor-home/tailor-home.component';
=======
>>>>>>> d975a58df8a4f951badebef0d87f2098da57b07e

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
<<<<<<< HEAD
    SignUpComponent,
    ConfirmPasswordDirective,
    LogInComponent,
    TailorHomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [UserserviceService],
=======
    SignUpComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
>>>>>>> d975a58df8a4f951badebef0d87f2098da57b07e
  bootstrap: [AppComponent]
})
export class AppModule { }
