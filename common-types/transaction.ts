
export interface IEntry {
    account: any;
    change: number;
}

export class Entry {
    constructor(
        public account: any,
        public change: number
    ) { }
}

export interface ITransaction {
    _id: any;
    description: string;
    date: Date;
    entries: IEntry[];
}

export class Transaction {
    constructor(
        public _id: any = undefined,
        public description: string = "",
        public date: Date = new Date(),
        public entries: Entry[] = []
    ) { }
}
