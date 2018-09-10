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
  sizesArray =  new Sizes();
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
      }
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
addSize(event: Event) {
  event.target['ownerDocument'].all['sizeForm'].style.visibility = 'visible';
  event.target['ownerDocument'].all['sizeInputGroup'].name = event.target['id'];
  this.type = event.target['id'];
}
showSize(event: Event) {
  const s = event.target['id'];
  if (s === 'S') {
    this.type = 'small';
  } else if (s === 'M') {
    this.type = 'medium';
  } else if (s === 'L') {
    this.type = 'large';
  }
  event.target['ownerDocument'].all['sizeForm'].style.visibility = 'visible';
}

discardSize(event: Event) {
  event.target['ownerDocument'].all['sizeForm'].style.visibility = 'hidden';
  for ( let i = 0; i < document.getElementsByClassName('size-link').length; i++) {
    document.getElementsByClassName('size-link').item(i).classList.remove('active');
    document.getElementsByClassName('size-link').item(i).classList.remove('show');
  }
}
saveSize(name: String, value: Number, sizeType: String) {
  this.sizesArray[`${this.type}`].push(new Size({name: name, value: value}));
  console.log(this.sizesArray);

}
clear(event?: Event) {
  if (event) {
    event.target['previousSibling']['children'][0].value = '';
    event.target['value'] = '';
  } else {
    (<HTMLInputElement>document.getElementById('sizeName')).value = '';
    (<HTMLInputElement>document.getElementById('sizeValue')).value = '';
  }
}

get getArray() {
    if (this.isSmallSize) {
      return this.SmallSizes;
    } else if (this.isMediumSize) {
     return this.MediumSizes;
    } else if (this.isLargeSize) {
     return this.LargeSizes;
    } else {
      return [];
    }
}
get noSize() {
  if (this.isSmallSize) {
    return 'Small sizes';
  } else if (this.isMediumSize) {
    return 'Medium Sizes';
  } else if (this.isLargeSize) {
    return 'Large Sizes';
  }
}
get isSmallSize() {
    return this.type === 'small';
}
get SmallSizes() {
    return this.sizesArray.small;
}

get isMediumSize() {
    return this.type === 'medium';
}
get MediumSizes() {
    return this.sizesArray.medium;
}
get isLargeSize() {
    return this.type === 'large';
}
get LargeSizes() {
    return this.sizesArray.large;
}
get AllSizes() {
    if (this.sizesArray) {
      return this.sizesArray.small.length > 0;
    }
}

}
