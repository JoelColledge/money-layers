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
    selectedIndex: number;

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
                this.transactions = transactions;
            });
    }

    add(): void {
        this.transactions.unshift(new Transaction());
    }

    update(event: {index: number, transaction: ITransaction, deselect: boolean}): void {
        this.transactionService
            .addOrUpdate(event.transaction)
            .subscribe((m) => {
                this.transactions[event.index] = m;
                if (event.deselect) {
                    this.selectedIndex = -1;
                }
            });
    }

    transactionSelected(index: number) {
        this.selectedIndex = index;
    }
}
