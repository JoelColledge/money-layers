
export function findAccountIdByName(structure: Structure, name: string): any {
    let account =  structure.accounts.find((account) => account.name === name);
    return account ? account._id : null;
}

export function findAccountNameById(structure: Structure, id: any): string {
    let account = findAccountById(structure, id);
    return account ? account.name : null;
}

export function findAccountById(structure: Structure, id: any): Account {
    return structure.accounts.find((account) => account._id === id);
}

export function findAccountIdsByType(structure: Structure, type: string): any[] {
    return structure.accounts
        .filter(account => account.type === type)
        .map(account => account._id);
}

export class Type {
    constructor(
        public _id: any = undefined,
        public name: string = "",
        public display: string = ""
    ) { }
}

export class Account {
    constructor(
        public _id: any = undefined,
        public name: string = "",
        public active: boolean = true,
        public type: string = "",
        public order: number = 0,
        public icon: string = ""
    ) { }
}

export class Rule {
    constructor(
        public _id: any = undefined,
        public typesLeft: string[] = [],
        public typesRight: string[] = []
    ) { }
}

export class Structure {
    constructor(
        public _id: any = undefined,
        public types: Type[] = [],
        public accountTotalTypes: string[] = [],
        public accounts: Account[] = [],
        public rules: Rule[] = []
    ) { }
}
