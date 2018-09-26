import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../settings.service';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent implements OnInit {
  localDisplayUrl = null;
  localHeaderUrl = null;
  constructor(public _settingsService: SettingsService) { }

  ngOnInit() {
  }

  changeTheme(i) {
    this._settingsService.changeTheme(i);
  }
  previewDisplay(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (readevent: any) => {
        this.localDisplayUrl = readevent.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);

    }
  }
  removeDisplay() {
    this.localDisplayUrl = '../../../assets/images/tailor-profile-dp.jpg';
  }
  previewHeader(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (readevent: any) => {
        this.localHeaderUrl = readevent.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);

    }
  }
  removeHeader() {
    this.localHeaderUrl = '../../../assets/images/header-bg-2.jpeg';
  }

}
