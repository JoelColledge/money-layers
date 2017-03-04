
export function dateToMonth(date: Date): number {
    return date.getFullYear() * 12 + date.getMonth();
}

export class Entry {
    constructor(
        public account: any = undefined,
        public change: number = 0
    ) { }
}

export class Transaction {
    public readonly month: number;

    constructor(
        public _id: any = undefined,
        public description: string = "",
        public date: Date = new Date(),
        public entries: Entry[] = []
    ) {
        this.month = dateToMonth(date);
    }
}
