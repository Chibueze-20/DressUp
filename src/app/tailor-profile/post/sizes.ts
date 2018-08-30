export class Sizes {
    small: Size[] =[];
    medium: Size[] =[];
    large: Size[] =[];
} 

export class Size{
    name: string;
    value: string;

    constructor(values: Object ={}){
        Object.assign(this,values);
    }
}