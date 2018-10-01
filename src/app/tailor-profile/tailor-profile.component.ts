import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../settings.service';
import { UserserviceService } from '../userservice.service'
@Component({
  selector: 'app-tailor-profile',
  templateUrl: './tailor-profile.component.html',
  styleUrls: ['./tailor-profile.component.css']
})
export class TailorProfileComponent implements OnInit {
  public static Tailor: any;
  details:any = null;
  feedbacks:any = null;
  constructor(private router:Router, private _settingsService:SettingsService, private userservice:UserserviceService) { }

  ngOnInit() {
    this.userservice.getData(this.userservice.uri+'/'+'tailor/'+TailorProfileComponent.Tailor)
    .subscribe(
      (res) => {this.details = res;},
      error => alert(error)
    )

  }
  goToSettings() {
    this.router.navigateByUrl("/settings");
  }
  goToAddPost():void {
    this.router.navigateByUrl("/post");
  }
  get Details() {
    return this.details;
  }
  get Feedbacks() {
    return this.feedbacks;
  }

}
