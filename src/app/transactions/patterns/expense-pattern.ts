
import {Account, Structure, findAccountIdByName, findAccountNameById} from '../../../../common-types/account';
import {Transaction, Entry} from '../../../../common-types/transaction';
import {EntryPattern, TransactionPattern} from './transaction-pattern';

export class ExpensePattern implements TransactionPattern {
    create(structure: Structure) {
        let transaction = new Transaction();
        transaction.entries = [
            new Entry(),
            new Entry(),
            new Entry(findAccountIdByName(structure, 'a-Current')),
            new Entry(findAccountIdByName(structure, 'a-World'))
        ];
        return transaction;
    }

    update(structure: Structure, transaction: Transaction) {
        if (transaction.entries.length < 4) {
            return transaction;
        }

        let change: number = transaction.entries[1].change;
        transaction.entries[0].change = -change;
        transaction.entries[2].change = -change;
        transaction.entries[3].change = change;

        let internalAccountName = findAccountNameById(structure, transaction.entries[0].account);
        transaction.entries[1].account = findAccountIdByName(structure, internalAccountName + ' expenses');

        return transaction;
    }

    entryPatterns = [
        new EntryPattern(true, false, false),
        new EntryPattern(false, true, false),
        new EntryPattern(true, false, false),
        new EntryPattern(false, false, false)
    ];
}
