
export interface IAccount {
    _id: any;
    name: string;
    layer: string;
    active: boolean;
}

export class Account {
    constructor(
        public _id: any = undefined,
        public name: string = "",
        public layer: string = "actual",
        public active: boolean = true
    ) { }
}
