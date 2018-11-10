import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  imgUrl = '../assets/images';

  themes: any[] = [
      {name: 'Default Theme', src: `${this.imgUrl}/themes/default-theme.png`, class: 'default-theme'},
      {name: 'Savanna Theme', src: `${this.imgUrl}/themes/savanna-theme.png`, class: 'savanna-theme' },
      {name: 'Clay Theme', src: `${this.imgUrl}/themes/clay-theme.png`, class: 'clay-theme'},
      {name: 'Dark Theme', src: `${this.imgUrl}/themes/dark-theme.png`, class: 'dark-theme'}
    ];

    selectedTheme = this.themes.find((val) => val.name === this.getProfile.Theme) || this.themes[0];

    changeTheme(i) {
      this.selectedTheme = this.themes[i];
      localStorage.setItem('selected-theme', JSON.stringify(this.selectedTheme));
    }
    Theme(name) {
      const currentTheme = this.themes.find((val) => val.name === name);
      return currentTheme.class;
    }
    get getProfile() {
      if (localStorage.getItem('User')) {
       return JSON.parse(localStorage.getItem('User')).Profile;
      }
    }
    get getTheme() {
      return this.selectedTheme;

    }

}
