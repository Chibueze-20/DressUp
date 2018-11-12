export class Schedule {
  task = '';
  duration = null;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
