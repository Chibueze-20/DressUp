import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SettingsService } from '../../settings.service';
import { UserserviceService } from '../../userservice.service';
import { Navigation } from 'src/app/shared/Navigation';
import { MyWindow } from 'src/app/shared/windowAlert';

declare let window:MyWindow;

@Component({
  selector: 'app-tailor-profile',
  templateUrl: './tailor-profile.component.html',
  styleUrls: ['./tailor-profile.component.css']
})
export class TailorProfileComponent implements OnInit {
  public static Tailor: any = '5bb137f48ca4291efc515a7c';
  details: any = {};
  feedbacks: any = null;
  constructor(private route: ActivatedRoute,private router: Router, public _settingsService: SettingsService, private userservice: UserserviceService) {
    Navigation.Title = 'Profile';
   }

  ngOnInit() {
    if (this.User.Role === 'Designer') {
      TailorProfileComponent.Tailor = this.User._id;
    }else{
      TailorProfileComponent.Tailor = this.route.snapshot.paramMap.get('id');
    }
    this.userservice.getData(this.userservice.uri + '/' + 'tailor/' + TailorProfileComponent.Tailor)
    .subscribe(
      (res) => {this.details = res; },
      error => alert(error)
    );

  }
  goToSettings() {
    this.router.navigateByUrl('/tailor/settings');
  }
  goToAddPost(): void {
    this.router.navigateByUrl('tailor/post/new');
  }
  get Details() {
    return this.details;
  }
  get Email(){
    if(this.details){
      return this.details.Account.Email || 'dummy@dressup.com'
    }else{
      return 'dummy@dressup.com'
    }
  }
  get PhoneNumber(){
    if(this.details.Contact){
      let number = this.details.Contact.PhoneNumber||'xxxxxxxxxxx'
      return '+234'+number.substring(1)
    }
  }
  get Rating(){
    if(this.details.Ratings){
      return this.details.Ratings.AvgRating;
    }else{
      return 'X';
    }
  }
  get Feedbacks() {
    return this.feedbacks;
  }
  get Theme(){
    return this._settingsService.Theme(this.ProfileTheme);
  }
  get User() {
    return JSON.parse(localStorage.getItem('User'));
  }
  get isFollowing() {
   const user = this.User;
   return user.Following.includes(TailorProfileComponent.Tailor);
  }
  follow() {
    const user = this.User;
   // let fallback = user;
    if (this.isFollowing === true) {
      // remove tailor
      let v:any[] = user.Following
      console.log('before',v,user.Following)
      v = v.filter((tailor)=> tailor !== TailorProfileComponent.Tailor)
      console.log(v);
      this.userservice.postData(this.userservice.uri+'/follow',{user:this.User._id,followers:v})
      .subscribe(
        (res:any)=>{localStorage.setItem('User',JSON.stringify(res.User)); window.toastr['info']('Unfollowed');
      },err=>window.toastr['error']('Unable to perform')
      )
      
    } else {
      const user = this.User;
      let v:any[] = user.Following
      console.log('before',v,user.Following)
      v.push(TailorProfileComponent.Tailor);
      console.log(v);
      this.userservice.postData(this.userservice.uri+'/follow',{user:this.User._id,followers:v})
      .subscribe(
        (res:any)=>{localStorage.setItem('User',JSON.stringify(res.User)); window.toastr['success']('following');
      },err=>window.toastr['error']('Unable to perform')
      )
      // update database
    }
  }
   get headerStyles() {
    if (this.details.Profile) {
      return 'url(' + this.details.Profile.Background + ')';
    } else {
      return 'url(../../assets/images/header-bg-2.jpeg)';
    }
   }
  get ProfileTags() {
    if (this.details.Profile) {
      return this.details.Profile.Tags;
    } else {
      return ['no tags'];
    }
  }
  get ProfileTheme() {
    if (this.details.Profile) {
      return this.details.Profile.Theme;
    } else {
      return 'Default Theme';
    }
  }
}
