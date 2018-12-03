import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserserviceService} from '../../userservice.service';
import {RequestserviceService} from '../../services/requestservice.service';
import { MyWindow } from 'src/app/shared/windowAlert';
import { Navigation } from 'src/app/shared/Navigation';

declare let window:MyWindow
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  localUrl: any;
  images: any[] = [];
  tags: string[] = [];
  tailor:string = '';
  selectedTailor:any = null;
  isSearching = false;
  results: any[] = [];
  arr_pic = [];
  upload=false;
  RequestForm: FormGroup = null;
  constructor(private userservice: UserserviceService, private requestservice: RequestserviceService) {
    Navigation.Title = 'New Bid';
    this.RequestForm = new FormGroup({
      'User': new FormControl(null),
      'Title': new FormControl(null, Validators.required),
      'Description': new FormControl(null, Validators.required),
      'Type': new FormControl('Bid', [Validators.required, Validators.pattern('^Bid$|^Direct$')]),
      'Conditions': new FormGroup({
        'Fitness': new FormControl(null,Validators.required),
        'Delivery': new FormControl(null,Validators.required)
      }),
      'Schedule': new FormGroup({
        'Duration': new FormControl(null,Validators.required)
      })
    });
  }

  ngOnInit() {
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
  get Upload(){return this.upload}
  goback() {
    alert('go back');
  }
  get user() {
    return JSON.parse(localStorage.getItem('User'));
  }
  get show() {
    return JSON.stringify(this.RequestForm.value);
  }
  get isDirect() {
    return this.RequestForm.get('Type').value === 'Direct';
  }
  get validForm(){
    if (this.isDirect) {
      return this.selectedTailor!==null && this.RequestForm.valid
    } else {
      return this.RequestForm.valid
    }
  }
  addImage(event: any) {
    if (event.target.files && event.target.files) {
      for ( let i = 0; i < event.target.files.length; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
        // this.localUrl = event.target.result;
        this.images.unshift(event.target.result);
        if(this.images.length === 5){
          this.images.pop();
        }
        // console.log(this.images);
      };
      reader.readAsDataURL(event.target.files[i]);
      }

    }
  }
  select(tailor){
    this.selectedTailor = tailor._id;
    console.log(this.selectedTailor);
    this.tailor = tailor.Brand.BrandName;
    this.results = []; 
  }
  search(value) {
    if (value === '' || value === null) {
      this.selectedTailor=null;
      return;
    } else {
      if (!this.isSearching) {
        this.isSearching = true;
        this.userservice.getData('http://localhost:4000/search/tailor/' + value)
          .subscribe(
            (res: any[]) => {
              this.results = res;
            }, error1 => window.toastr['error']('Error searching')
          );
        this.isSearching = false;
      }
    }
  }
  removeImage(i: number) {
    let temparr: any[];
    temparr = this.images;
    temparr = temparr.filter(image => this.images.indexOf(image) !== i);
    this.updatearr(temparr);
  }

  updatearr(imagearr: any[]) {
    this.images = imagearr;
  }

  get allimages() {
    return this.images;
  }

  uploadImages() {
    const arr_pic = [];
    for (let i = 0; i <  this.images.length; i++) {
      const  payload = {
        file: this.images[i],
        upload_preset: 'postdress',
      };
      this.userservice.postData('https://api.cloudinary.com/v1_1/chibuezeassets/image/upload', payload)
        .subscribe(
          (res:any) => {
            console.log(res);
            arr_pic.push(String(res.secure_url));
          } , error1 => {
            console.log(error1);
          } );
    }
    return arr_pic;
  }

  async SendRequest(withtags: boolean) {
    this.upload=true;
    this.RequestForm.get('User').setValue(this.user._id + '');
    for (let i = 0; i <  this.images.length; i++) {
      const  payload = {
        file: this.images[i],
        upload_preset: 'postdress',
      };
       await this.userservice.postData('https://api.cloudinary.com/v1_1/chibuezeassets/image/upload', payload).toPromise()
       .then((res:any) =>{console.log(res);
        this.arr_pic.push(String(res.secure_url));})
        .catch((err)=>{console.log(err)})
        console.log('done',i);
    }
    console.log('http over');
    const default_pic: string[] = ['assets/images/pete-bellis-396528-unsplash.jpg'];
    let body;
    if (this.arr_pic.length > 0) {
      const picture = this.arr_pic
      body = withtags ? {
        request: this.RequestForm.value,
        pic: picture,
        tags: this.tags,
        tailor:this.selectedTailor
      } : {
        request: this.RequestForm.value,
        pic: picture,
        tailor:this.selectedTailor
      };
      this.requestservice.PostOrder(body, 'send').subscribe(
        (res) => {
          // alert(JSON.stringify(res));
          this.RequestForm.reset();
          this.RequestForm.get('Type').setValue('Bid');
          this.arr_pic=[];this.images=[];this.upload=false;
          window.toastr['success']('Bid sent succesfully');
        }, err => {
          window.toastr['error']('Problem sending bid');
          this.upload=false;
        }
      );
    } else {
      window.toastr['error']('Problem uploading pictures, make sure you have selected pictures and have good connection');
      this.upload=false;
    }
    
  }
}
