
export class Entry {
    constructor(
        public account: any = undefined,
        public change: number = 0
    ) { }
}

export class Transaction {
    constructor(
        public _id: any = undefined,
        public description: string = "",
        public date: Date = new Date(),
        public entries: Entry[] = []
    ) { }
}
