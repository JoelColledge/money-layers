
export function findAccountIdByName(structure: Structure, name: string): any {
    let account =  structure.accounts.find((account) => account.name === name);
    return account ? account._id : null;
}

export function findAccountNameById(structure: Structure, id: any): string {
    let account = structure.accounts.find((account) => account._id === id);
    return account ? account.name : null;
}

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
