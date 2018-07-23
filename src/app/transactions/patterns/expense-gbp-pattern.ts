
import {Account, Structure, findAccountIdByName, findAccountNameById} from '../../../../common-types/structure';
import {Transaction, Entry} from '../../../../common-types/transaction';
import {EntryPattern, TransactionPattern} from './transaction-pattern';

export class ExpenseGbpPattern implements TransactionPattern {
    create(structure: Structure) {
        let transaction = new Transaction();
        transaction.entries = [
            new Entry(),
            new Entry(),
            new Entry(findAccountIdByName(structure, 'Trading')),
            new Entry(findAccountIdByName(structure, 'Trading buffer')),
            new Entry(findAccountIdByName(structure, 'GBP-Buffer')),
            new Entry(findAccountIdByName(structure, 'GBP-Trading')),
            new Entry(findAccountIdByName(structure, 'GBP-Bank account'))
        ];
        return transaction;
    }

    update(structure: Structure, transaction: Transaction) {
        if (transaction.entries.length < 7) {
            return transaction;
        }

        let change: number = transaction.entries[1].change;
        transaction.entries[0].change = -change;
        transaction.entries[2].change = -change;
        transaction.entries[3].change = change;

        let gbpChange: number = transaction.entries[5].change;
        transaction.entries[4].change = -gbpChange;
        transaction.entries[6].change = -gbpChange;

        let internalAccountName = findAccountNameById(structure, transaction.entries[0].account);
        transaction.entries[1].account = findAccountIdByName(structure, internalAccountName + ' expenses');

        return transaction;
    }

    entryPatterns = [
        new EntryPattern(true, false, false),
        new EntryPattern(false, true, false),
        new EntryPattern(false, false, false),
        new EntryPattern(false, false, false),
        new EntryPattern(false, false, false),
        new EntryPattern(false, true, false),
        new EntryPattern(true, false, false)
    ];
}
