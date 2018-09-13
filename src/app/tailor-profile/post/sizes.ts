export class Sizes {
    Title: string;
    shortTitle: string;
    sizes: Size[];
}

export class Size {
    name: string;
    value: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
