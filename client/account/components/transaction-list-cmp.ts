import {
    Component,
    OnInit
} from '@angular/core';

import {
    Router
} from '@angular/router';

import {
    TransactionService
} from '../services/transaction-service';

import {ITransaction, Transaction} from '../../../common-types/transaction';

@Component({
    selector: 'transaction-cmp',
    templateUrl: 'account/templates/transaction-list.html',
    styleUrls: []
})
export class TransactionListCmp implements OnInit {
    transactions: ITransaction[] = [];

    constructor(
        private transactionService: TransactionService,
        private router: Router
    ) { }

    ngOnInit() {
        this._getAll();
    }

    private _getAll(): void {
        this.transactionService
            .getAll()
            .subscribe((transactions) => {
                console.log('got all transactions', transactions);
                this.transactions = transactions;
            });
    }

    add(): void {
        this.transactions.unshift(new Transaction());
    }

    update(event: {index: number, transaction: ITransaction}): void {
        this.transactionService
            .update(event.transaction)
            .subscribe((m) => {
                this.transactions[event.index] = m;
            });
    }

    transactionSelected(transaction: ITransaction) {

    }
}
