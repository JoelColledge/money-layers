
export class AccountTotal {
    constructor(
        public account: string = undefined,
        public total: number = 0
    ) { }
}

export class MonthChange {
    constructor(
        public month: number = -1,
        public increase: number = 0,
        public decrease: number = 0
    ) { }
}
