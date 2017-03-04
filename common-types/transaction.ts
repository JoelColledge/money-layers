
export function dateToMonth(date: Date): number {
    return date.getFullYear() * 12 + date.getMonth();
}

export function prepareTransactionForIndex(transaction: Transaction): void {
    console.log(transaction.date);
    console.log(new Date(transaction.date));
    transaction.month = dateToMonth(new Date(transaction.date));
}

export class Entry {
    constructor(
        public account: any = undefined,
        public change: number = 0
    ) { }
}

export class Transaction {
    public month: number = -1;

    constructor(
        public _id: any = undefined,
        public description: string = "",
        public date: string = (new Date()).toISOString(),
        public entries: Entry[] = []
    ) { }
}
