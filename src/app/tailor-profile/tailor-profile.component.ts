import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-tailor-profile',
  templateUrl: './tailor-profile.component.html',
  styleUrls: ['./tailor-profile.component.css']
})
export class TailorProfileComponent implements OnInit {
  

  constructor(private router:Router, private _settingsService:SettingsService) { }

  ngOnInit() {
  }
  goToSettings(){
    this.router.navigateByUrl("/settings");
  }
  goToAddPost():void{
    this.router.navigateByUrl("/post");
  }


}
