export class Sizes {
    Title: string;
    sizes: Size[];
}

export class Size {
    name: string;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
