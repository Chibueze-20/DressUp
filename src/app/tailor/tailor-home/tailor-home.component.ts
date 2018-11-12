import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tailor-home',
  templateUrl: './tailor-home.component.html',
  styleUrls: ['./tailor-home.component.css']
})
export class TailorHomeComponent implements OnInit {

  constructor(private route: Router) {
    if (sessionStorage.getItem('message')) {
      if (JSON.parse(sessionStorage.getItem('message')).Type === 'Error') {
        this.route.navigateByUrl('/login')
          .then(sm => console.log('routed' + sm));
      }
    }
  }

  ngOnInit() {

  }

  gotoSettings(){
    this.route.navigateByUrl('/tailor/settings')
  }
  gotoProfile(){
    this.route.navigateByUrl('/tailor/home/profile');
  }
  gotoPost(){
    this.route.navigateByUrl('/tailor/post/new');
  }
  gotoJob(){
    this.route.navigateByUrl('/tailor/home/jobs')
  }
  Logout(){
    localStorage.removeItem('User');
    this.route.navigateByUrl('/login');
  }
}
