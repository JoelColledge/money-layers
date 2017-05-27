
import {Account, Structure, findAccountIdByName, findAccountNameById} from '../../../../common-types/account';
import {Transaction, Entry} from '../../../../common-types/transaction';
import {EntryPattern, TransactionPattern} from './transaction-pattern';

export class WithdrawalPattern implements TransactionPattern {
    create(structure: Structure) {
        let transaction = new Transaction();
        transaction.entries = [
            new Entry(findAccountIdByName(structure, 'a-Current')),
            new Entry(findAccountIdByName(structure, 'a-Cash'))
        ];
        return transaction;
    }

    update(structure: Structure, transaction: Transaction) {
        if (transaction.entries.length < 2) {
            return transaction;
        }

        let change: number = transaction.entries[1].change;
        transaction.entries[0].change = -change;

        return transaction;
    }

    entryPatterns = [
        new EntryPattern(false, false, false),
        new EntryPattern(false, true, false)
    ];
}