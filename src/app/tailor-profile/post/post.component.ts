import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Sizes} from './sizes';
import {Size} from './sizes';
import {UserserviceService} from '../../userservice.service';
import {Navigation} from '../../shared/Navigation';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
  PostForm: FormGroup = null;
  tags: string[] = [];
  constructor( private userservice: UserserviceService ) {
    Navigation.Title = 'New Post';
    this.PostForm = new FormGroup({
      'Tailor': new FormControl(null),
      'Title': new FormControl(null, Validators.required),
      'Description': new FormControl(null, Validators.required),
      'Price': new FormControl(null, Validators.required),
      'Conditions': new FormGroup({
        'BYOM': new FormControl(false),
        'Negotiable': new FormControl(false)
      }),
      'Sizes': new FormGroup({
        'Men': new FormGroup({
          'S': new FormControl(false),
          'M': new FormControl(false),
          'L': new FormControl(false),
          'XL': new FormControl(false),
          'XXL': new FormControl(false)
        }),
        'Women': new FormGroup({
          'XXS': new FormControl(false),
          'XS': new FormControl(false),
          'S': new FormControl(false),
          'M': new FormControl(false),
          'L': new FormControl(false),
          '1X': new FormControl(false),
          '2X': new FormControl(false),
          '3X': new FormControl(false),
          '4X': new FormControl(false),
        }),
        'Girl': new FormGroup({
          'Size 4': new FormControl(false),
          'Size 5': new FormControl(false),
          'Size 6': new FormControl(false),
          'Size 7': new FormControl(false),
          'Size 8': new FormControl(false),
          'Size 9': new FormControl(false),
          'Size 10': new FormControl(false),
          'Size 12': new FormControl(false),
          'Size 14': new FormControl(false),
          'Size 16': new FormControl(false),
        }),
        'Boy': new FormGroup({
          'Size 4': new FormControl(false),
          'Size 5': new FormControl(false),
          'Size 6': new FormControl(false),
          'Size 7': new FormControl(false),
          'Size 8': new FormControl(false),
          'Size 9': new FormControl(false),
          'Size 10': new FormControl(false),
          'Size 12': new FormControl(false),
          'Size 14': new FormControl(false),
          'Size 16': new FormControl(false),
        }),
        'Kid': new FormGroup({
          'XXS': new FormControl(false),
          'XS': new FormControl(false),
          'S': new FormControl(false),
          'M': new FormControl(false),
          'L': new FormControl(false),
          'XL': new FormControl(false),
        }),
        'Toddler': new FormGroup({
          'T1': new FormControl(false),
          'T2': new FormControl(false),
          'T3': new FormControl(false),
          'T4': new FormControl(false),
        }),
        'Baby': new FormGroup({
          'Newborn': new FormControl(false),
          '0-3 months': new FormControl(false),
          '3-6 months': new FormControl(false),
          '6-12 months': new FormControl(false),
          '12-16 months': new FormControl(false),
          '16-24 months': new FormControl(false),
        }),
        'Custom': new FormControl(false)
      })
      }
    );
  }

  ngOnInit() {
  }
  get Qhow() {
    return JSON.stringify(this.PostForm.value);
  }
  get sizes() {
    return this.PostForm.get('Sizes');
  }
  get Tags() {
    return this.tags;
  }

  addTag(event) {
    const inputElement = (<HTMLInputElement>event.target);
    const value = inputElement.value;
    this.tags.push(value);
    event.target['value'] = '';
  }
  clearTags() {
    this.tags = [];
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
      let reader = new FileReader();
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

