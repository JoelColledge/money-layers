
import {Structure} from '../../../../common-types/structure';
import {Transaction} from '../../../../common-types/transaction';
import {TransactionPattern} from './transaction-pattern';

export class GenericPattern implements TransactionPattern {
    create(structure: Structure) {
        return new Transaction();
    }

    update(structure: Structure, transaction: Transaction) {
        return transaction;
    }

    entryPatterns = [];
}
