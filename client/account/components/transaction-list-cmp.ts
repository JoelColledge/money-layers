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
    newTransaction: Transaction = new Transaction();

    constructor(
        private _transactionService: TransactionService,
        private router: Router
    ) { }

    ngOnInit() {
        this._getAll();
    }

    private _getAll(): void {
        this._transactionService
            .getAll()
            .subscribe((transactions) => {
                console.log('got all transactions', transactions);
                this.transactions = transactions;
            });
    }

    add(transaction: ITransaction): void {
        this.newTransaction = new Transaction();
    }

    remove(id: string): void {
        // this._transactionService
        //     .remove(id)
        //     .subscribe(() => {
        //         this.transactions.forEach((t, i) => {
        //             if (t._id === id)
        //                 return this.transactions.splice(i, 1);
        //         });
        //     })
    }

    onSelect(transaction: ITransaction) {
        // this.router.navigate(['/transaction', transaction._id]);
    }
}
