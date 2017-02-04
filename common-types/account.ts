
export class Account {
    constructor(
        public _id: any = undefined,
        public name: string = "",
        public layer: string = "actual",
        public active: boolean = true,
        public groups: string[] = []
    ) { }
}

export class Rule {
    constructor(
        public _id: any = undefined,
        public groupLeft: string = undefined,
        public groupRight: string = "zero"
    ) { }
}

export class Structure {
    constructor(
        public accounts: Account[] = [],
        public rules: Rule[] = []
    ) { }
}
