import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extensions'
})
export class ExtensionsPipe implements PipeTransform {

  transform(value: number, ext: string): string {
    if(value){
      return value + " " + ext
    }else{
      return '';
    }
    
  }

}
