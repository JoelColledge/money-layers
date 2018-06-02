
import {Account, Structure, findAccountIdByName, findAccountNameById} from '../../../../common-types/account';
import {Transaction, Entry} from '../../../../common-types/transaction';
import {EntryPattern, TransactionPattern} from './transaction-pattern';

export class IncomePattern implements TransactionPattern {
    create(structure: Structure) {
        let transaction = new Transaction();
        transaction.entries = [
            new Entry(findAccountIdByName(structure, 'Income')),
            new Entry(findAccountIdByName(structure, 'Buffer')),
            new Entry(findAccountIdByName(structure, 'a-Current'))
        ];
        return transaction;
    }

    update(structure: Structure, transaction: Transaction) {
        if (transaction.entries.length < 3) {
            return transaction;
        }

        let change: number = transaction.entries[1].change;
        transaction.entries[0].change = -change;
        transaction.entries[2].change = change;

        return transaction;
    }

    entryPatterns = [
        new EntryPattern(false, false, false),
        new EntryPattern(false, true, false),
        new EntryPattern(false, false, false)
    ];
}
