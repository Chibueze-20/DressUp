import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Sizes} from './sizes';
import {Size} from './sizes';
import {UserserviceService} from '../../../userservice.service';
import {Navigation} from '../../../shared/Navigation';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostserviceService} from '../../../services/postservice.service';
import { MyWindow } from 'src/app/shared/windowAlert';

declare let window:MyWindow
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css', '../../../../assets/css/checkbox.css']
})
export class PostComponent implements OnInit {
  type: String;
  image: any;
  localUrl: any[] = [];
  formData = new FormData();
  filesize = 0;
  next = false;
  PostForm: FormGroup = null;
  tags: string[] = [];
  constructor( private userservice: UserserviceService, private postservice: PostserviceService, private location:Location) {
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
          'XL': new FormControl(false),
          'XXL': new FormControl(false),
          'XXXL': new FormControl(false),
          'XXXXL': new FormControl(false),
        }),
        'Girl': new FormGroup({
          'Size4': new FormControl(false),
          'Size5': new FormControl(false),
          'Size6': new FormControl(false),
          'Size7': new FormControl(false),
          'Size8': new FormControl(false),
          'Size9': new FormControl(false),
          'Size10': new FormControl(false),
          'Size12': new FormControl(false),
          'Size14': new FormControl(false),
          'Size16': new FormControl(false),
        }),
        'Boy': new FormGroup({
          'Size4': new FormControl(false),
          'Size5': new FormControl(false),
          'Size6': new FormControl(false),
          'Size7': new FormControl(false),
          'Size8': new FormControl(false),
          'Size9': new FormControl(false),
          'Size10': new FormControl(false),
          'Size12': new FormControl(false),
          'Size14': new FormControl(false),
          'Size16': new FormControl(false),
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
          'B1': new FormControl(false),
          'B2': new FormControl(false),
          'B3': new FormControl(false),
          'B4': new FormControl(false),
          'B5': new FormControl(false),
          'B6': new FormControl(false),
        }),
        'Custom': new FormControl(true)
      })
      }
    );
  }

  ngOnInit() {
    
  }
  reset(){
    this.PostForm.reset({
      Tailor:null,
      Title:null,
      Description:null,
      Price:null,
      Conditions:{
        BYOM: false,
        Negotiable: false
      },
      Sizes:{
        Men:{
          S: false,
          M: false,
          L: false,
          XL: false,
          XXL: false
        },
        Women:{
          XXS: false,
          XS: false,
          S: false,
          M: false,
          L: false,
          XL: false,
          XXL: false,
          XXXL: false,
          XXXXL: false
        },
        Girl:{
          Size4: false,
          Size5: false,
          Size6: false,
          Size7: false,
          Size8: false,
          Size9: false,
          Size10: false,
          Size12: false,
          Size14: false,
          Size16: false
        },
        Boy:{
          Size4: false,
          Size5: false,
          Size6: false,
          Size7: false,
          Size8: false,
          Size9: false,
          Size10: false,
          Size12: false,
          Size14: false,
          Size16: false
        },
        Kid:{
          XXS: false,
          XS: false,
          S: false,
          M: false,
          L: false,
          XL: false
        },
        Toddler:{
          T1: false,
          T2: false,
          T3: false,
          T4: false
        },
        Baby:{
          B1: false,
          B2: false,
          B3: false,
          B4: false,
          B5: false,
          B6: false
        },
        Custom: true
    }
  })
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
    this.location.back();
  }
show(e) {
  console.log(e);
}
get user() {
   return JSON.parse(localStorage.getItem('User'));
}
  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.filesize = event.target.files[0].size;
      this.formData.append('file', event.target.files[0]);
      console.log(this.formData.get('file'));
      let reader = new FileReader();
      reader.onload = (event: any) => {
        if (this.localUrl.length==4) {
          this.localUrl.shift();
          this.localUrl.push(event.target.result)
        } else {
          this.localUrl.push(event.target.result);
        }
      };
      reader.readAsDataURL(event.target.files[0]);

    }
  }

  upload(localUrl:any):any {
  const  payload = {
      file: localUrl,
      upload_preset: 'postdress',
      public_id: this.user._id + '/' + this.user.Role + '/' + localUrl.toString().slice(0, 5)
    };
    this.userservice.postData('https://api.cloudinary.com/v1_1/chibuezeassets/image/upload', payload)
      .subscribe(
        (res) => {
          console.log(res);
          return res;
        } , error1 => {
        console.log(error1);
        return null;
      } );
  }
  uploadImage(){
    const arr_pic = [];
    if (this.localUrl.length<=0) {
      return [];
    } else {
      for(let i=0;i<this.localUrl.length;i++){
        const picture = this.upload(this.localUrl[i]);
        if(picture){
          arr_pic.push(picture);
        }else{
          return [];
        }
    }
    return arr_pic;
    }
    
  }

  remove() {
    this.localUrl = [];
  }
get imagesize() {
    return this.filesize / 1024;
}

sendPost(withtags: boolean) {
    this.PostForm.get('Tailor').setValue(this.user._id + '');
  const picture = this.uploadImage(); const default_pic: string[] = ['assets/images/pete-bellis-396528-unsplash.jpg']
  let body;
  if (picture.length>0) {
    body = withtags ? {
      post: this.PostForm.value,
      pic: picture,
      tags: this.tags
    } : {
      post: this.PostForm.value,
      pic: picture
    };
    this.postservice.Postpost(body, 'new').subscribe(
      (res) => {
        // alert(JSON.stringify(res));
        this.reset();
        window.toastr['success']('Successfully Posted');
        
      }, err => {
        // alert(err);
        window.toastr['error']('Problem sending post');
      }
    );
  } else {
    window.toastr['error']('Problem uploading post pictures, make sure you selected pictures and have good connection');
  }
  
}

}

