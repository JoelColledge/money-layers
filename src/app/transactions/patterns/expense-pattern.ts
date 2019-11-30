
import {Account, Structure, findAccountIdByName, findAccountNameById} from '../../../../common-types/structure';
import {Transaction, Entry} from '../../../../common-types/transaction';
import {EntryPattern, TransactionPattern} from './transaction-pattern';

export class ExpensePattern implements TransactionPattern {

    entryPatterns = [
        new EntryPattern(true, false, false),
        new EntryPattern(false, true, false),
        new EntryPattern(true, false, false)
    ];
    create(structure: Structure) {
        const transaction = new Transaction();
        transaction.entries = [
            new Entry(),
            new Entry(),
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
        transaction.entries[2].change = -change;

        const internalAccountName = findAccountNameById(structure, transaction.entries[0].account);
        transaction.entries[1].account = findAccountIdByName(structure, internalAccountName + ' expenses');

        return transaction;
    }
}
