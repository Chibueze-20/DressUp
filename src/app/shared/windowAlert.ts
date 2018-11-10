import { IRaveOptions } from "./Payment";

export interface MyWindow extends Window {
  getpaidSetup: (options: IRaveOptions) => void;
    toastr:any;
    runcarosel:()=> void;
  }