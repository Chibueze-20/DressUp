import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Sizes} from './sizes';
import {Size} from './sizes';
import {UserserviceService} from '../../userservice.service';
import {Navigation} from '../../shared/Navigation';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css', '../../../assets/css/checkbox.css']
})
export class PostComponent implements OnInit {
  type: String;
  image: any;
  localUrl: any = null;
  formData = new FormData();
  filesize = 0;
  next = false;
  constructor( private userservice: UserserviceService ) {
    Navigation.Title = 'New Post';
  }

  ngOnInit() {

  }
  gonext() {
    this.next = true;
  }
  goback() {
    this.localUrl = null;
    this.next = false;
  }
show(e) {
  console.log(e);
}

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.filesize = event.target.files[0].size;
      this.formData.append('file', event.target.files[0]);
      console.log(this.formData.get('file'));
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);

    }
  }

  uploadImage() {
  const  payload = {
      file: this.localUrl,
      upload_preset: 'postdress',
      public_id: 'e_no_be_by_force'
    };
    this.userservice.postData('https://api.cloudinary.com/v1_1/chibuezeassets/image/upload', payload)
      .subscribe((res) => {console.log(res); }, error1 => {
        console.log(error1);
      } );
  }

  remove() {
    this.localUrl = null;
  }
get imagesize() {
    return this.filesize / 1024;
}

}

