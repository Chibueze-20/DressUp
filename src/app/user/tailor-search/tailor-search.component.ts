import { Component, OnInit } from '@angular/core';
import {UserserviceService} from '../../userservice.service';

@Component({
  selector: 'app-tailor-search',
  templateUrl: './tailor-search.component.html',
  styleUrls: ['./tailor-search.component.css']
})
export class TailorSearchComponent implements OnInit {
  isSearching = false;
  results: any[] = [];
  constructor(private userSercive: UserserviceService) { }

  ngOnInit() {
  }

  search(value) {
    if (value === '' || value === null) {
      return;
    } else {
      if (!this.isSearching) {
        this.isSearching = true;
        this.userSercive.getData('http://localhost:4000/search/tailor/' + value)
          .subscribe(
            (res: any[]) => {
              this.results = res;
            }, error1 => alert('error finding feeds')
          );
        this.isSearching = false;
      }
    }
  }

  get SearchResults() {
    return this.results;
  }
}
