import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../../settings.service';
import { UserserviceService } from '../../userservice.service'
@Component({
  selector: 'app-tailor-profile',
  templateUrl: './tailor-profile.component.html',
  styleUrls: ['./tailor-profile.component.css']
})
export class TailorProfileComponent implements OnInit {
  public static Tailor: any = '5bb137f48ca4291efc515a7c';
  details: any = null;
  feedbacks: any = null;
  constructor(private router: Router, private _settingsService: SettingsService, private userservice: UserserviceService) { }

  ngOnInit() {
    if (this.User.Role === 'Designer') {
      TailorProfileComponent.Tailor = this.User._id;
    }
    this.userservice.getData(this.userservice.uri + '/' + 'tailor/' + TailorProfileComponent.Tailor)
    .subscribe(
      (res) => {this.details = res; },
      error => alert(error)
    );

  }
  goToSettings() {
    this.router.navigateByUrl('/settings');
  }
  goToAddPost(): void {
    this.router.navigateByUrl('/post');
  }
  get Details() {
    return this.details;
  }
  get Feedbacks() {
    return this.feedbacks;
  }
  get User() {
    return JSON.parse(localStorage.getItem('User'));
  }
  get isFollowing(){
   let user = this.User;
   return user.Following.includes(TailorProfileComponent.Tailor);
  }
  follow(){
    if(this.isFollowing == true){
      // remove tailor
    }else{
      this.User.Following.push(TailorProfileComponent.Tailor);
      //update database
    }
  }
   get headerStyles() {
    if (this.details.Profile.Background) {
      return 'url(' + this.details.Profile.Background + ')';
    } else {
      return 'url(../../assets/images/header-bg-2.jpeg)';
    }
   }

}
