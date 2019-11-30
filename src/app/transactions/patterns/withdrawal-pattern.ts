
import {Account, Structure, findAccountIdByName, findAccountNameById} from '../../../../common-types/structure';
import {Transaction, Entry} from '../../../../common-types/transaction';
import {EntryPattern, TransactionPattern} from './transaction-pattern';

export class WithdrawalPattern implements TransactionPattern {

    entryPatterns = [
        new EntryPattern(false, false, false),
        new EntryPattern(false, true, false)
    ];
    create(structure: Structure) {
        const transaction = new Transaction();
        transaction.description = 'ATM';
        transaction.entries = [
            new Entry(findAccountIdByName(structure, 'Bank account')),
            new Entry(findAccountIdByName(structure, 'Cash'))
        ];
        return transaction;
    }

    update(structure: Structure, transaction: Transaction) {
        if (transaction.entries.length < 2) {
            return transaction;
        }

        const change: number = transaction.entries[1].change;
        transaction.entries[0].change = -change;

        return transaction;
    }
}
