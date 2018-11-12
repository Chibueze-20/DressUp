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

}
