
import {Structure} from '../../../../common-types/account';
import {Transaction} from '../../../../common-types/transaction';

export class EntryPattern {
    constructor(
        public accountEnabled: boolean = true,
        public changeEnabled: boolean = true,
        public deleteEnabled: boolean = true
    ) { }
}

export interface TransactionPattern {
    create: (structure: Structure) => Transaction;
    update: (structure: Structure, transaction: Transaction) => Transaction;
    entryPatterns: EntryPattern[];
}
