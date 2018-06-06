
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

export function findAccountIdsByGroup(structure: Structure, group: string): any[] {
    return structure.accounts
        .filter(account => account.groups.includes(group))
        .map(account => account._id);
}

export class Account {
    constructor(
        public _id: any = undefined,
        public name: string = "",
        public active: boolean = true,
        public groups: string[] = [],
        public order: number = 0,
        public showInList: boolean = true,
        public icon: string = ""
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
        public _id: any = undefined,
        public accounts: Account[] = [],
        public rules: Rule[] = []
    ) { }
}
