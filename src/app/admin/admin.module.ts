import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserReportComponent } from './admin-home/user-report/user-report.component';
import { PushNotificationComponent } from './push-notification/push-notification.component';
import { LogInComponent } from './log-in/log-in.component';
import { OrderListComponent } from './order-list/order-list.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [AdminHomeComponent, UsersListComponent, UserReportComponent, PushNotificationComponent, LogInComponent, OrderListComponent]
})
export class AdminModule { }
