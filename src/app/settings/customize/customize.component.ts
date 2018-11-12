import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../settings.service';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent implements OnInit {

  constructor(private _settingsService:SettingsService) { }

  ngOnInit() {
  }
  changeTheme(i){
    this._settingsService.changeTheme(i);
  }

}
