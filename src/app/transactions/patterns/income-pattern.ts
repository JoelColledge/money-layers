
import {Account, Structure, findAccountIdByName, findAccountNameById} from '../../../../common-types/structure';
import {Transaction, Entry} from '../../../../common-types/transaction';
import {EntryPattern, TransactionPattern} from './transaction-pattern';

export class IncomePattern implements TransactionPattern {

    entryPatterns = [
        new EntryPattern(false, false, false),
        new EntryPattern(false, true, false),
        new EntryPattern(false, false, false)
    ];
    create(structure: Structure) {
        const transaction = new Transaction();
        transaction.entries = [
            new Entry(findAccountIdByName(structure, 'Income')),
            new Entry(findAccountIdByName(structure, 'Income buffer')),
            new Entry(findAccountIdByName(structure, 'Bank account'))
        ];
        return transaction;
    }

    update(structure: Structure, transaction: Transaction) {
        if (transaction.entries.length < 3) {
            return transaction;
        }

        const change: number = transaction.entries[1].change;
        transaction.entries[0].change = -change;
        transaction.entries[2].change = change;

        return transaction;
    }
}
