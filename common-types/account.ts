
export interface IAccount {
    _id: any;
    name: string;
    active: boolean;
}

export class Account {
    constructor(
        public _id: any = undefined,
        public name: string = "",
        public active: boolean = true
    ) { }
}
