import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {V} from '@angular/core/src/render3';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  localUrl: any;
  images: any[] = [];
  RequestForm: FormGroup = null;
  constructor() {
    this.RequestForm = new FormGroup({
      'Tailor': new FormControl(null),
      'Title': new FormControl(null, Validators.required),
      'Description': new FormControl(null, Validators.required),
      'Type': new FormControl('Bid', [Validators.required, Validators.pattern('^Bid$|^Direct$')]),
      'Conditions': new FormGroup({
        'Fitness': new FormControl(null),
      }),
    });
  }

  ngOnInit() {
  }
  get isDirect() {
    return this.RequestForm.get('Type').value === 'Direct';
  }
  addImage(event: any) {
    if (event.target.files && event.target.files) {
      for( let i = 0; i < event.target.files.length; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
        // this.localUrl = event.target.result;
        this.images.unshift(event.target.result);
        // console.log(this.images);
      };
      reader.readAsDataURL(event.target.files[i]);
      }

    }
  }

  removeImage(i: number) {
    let temparr: any[];
    temparr = this.images;
    temparr = temparr.filter(image => this.images.indexOf(image) !== i);
    this.updatearr(temparr);
  }

  updatearr(imagearr : any[]){
    this.images = imagearr
  }

  get allimages() {
    return this.images;
  }
}
