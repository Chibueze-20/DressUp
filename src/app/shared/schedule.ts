export class Schedule {
  task: string;
  duration: number;

  constructor(values: Object = {}){
    Object.assign(this, values);
  }
}
