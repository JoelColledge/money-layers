import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';

import {
    Router
} from '@angular/router';

import {
    TransactionService
} from '../services/transaction-service';

import {ITransaction, Transaction} from '../../../common-types/transaction';

@Component({
    selector: 'transaction',
    templateUrl: 'account/templates/transaction.html',
    styleUrls: []
})
export class TransactionCmp implements OnInit {
    @Input() transaction: ITransaction = new Transaction();
    @Output() onAdd = new EventEmitter<ITransaction>();

    constructor(
        private _transactionService: TransactionService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    add(): void {
        this._transactionService
            .add(this.transaction)
            .subscribe((m) => {
                this.onAdd.emit(m);
            });
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
}
