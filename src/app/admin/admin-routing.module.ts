import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogInComponent} from './log-in/log-in.component';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {UserReportComponent} from './admin-home/user-report/user-report.component';

const routes: Routes = [
  {path: '', component: LogInComponent},
  {path: 'home', component: AdminHomeComponent, children: [
      {path: '', component: UserReportComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
