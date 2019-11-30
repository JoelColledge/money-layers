
export function dateToMonth(date: Date): number {
    return date.getFullYear() * 12 + date.getMonth();
}

export function monthToDate(month: number): Date {
    const year = Math.floor(month / 12);
    const monthInYear = month - year * 12;
    return new Date(Date.UTC(year, monthInYear));
}

export function prepareTransactionForIndex(transaction: Transaction): void {
    transaction.month = dateToMonth(new Date(transaction.date));
}

export function calendarDate(date: Date): string {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString();
}

export class Entry {
    constructor(
        public account: any = undefined,
        public change: number = 0
    ) { }
}

export class Transaction {
    public month = -1;

    constructor(
        public _id: any = undefined,
        public description: string = '',
        public notes: string = '',
        public date: string = calendarDate(new Date()),
        public entries: Entry[] = []
    ) { }
}
