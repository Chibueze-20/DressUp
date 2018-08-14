import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { LandingComponent } from '../landing/landing.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { LogInComponent } from '../log-in/log-in.component';

const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'index', component: LandingComponent},
  {path: 'login', component: LogInComponent},
  {path: 'register', component: SignUpComponent}
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
