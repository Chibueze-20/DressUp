import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  localUrl: any;
  images: any[] = [];
  constructor() { }

  ngOnInit() {
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

  get allimages(){
    return this.images;
  }
}
