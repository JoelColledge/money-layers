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
    styleUrls: ['account/styles/account.css']
})
export class TransactionCmp implements OnInit {
    @Input() index: number;
    @Input() transaction: ITransaction = new Transaction();
    @Input() editMode: boolean = false;
    @Output() onSelect = new EventEmitter<void>();
    @Output() onUpdate = new EventEmitter<{index: number, transaction: Transaction}>();

    constructor(
        private transactionService: TransactionService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    update(): void {
        this.onUpdate.emit({index: this.index, transaction: this.transaction});
        this.editMode = false;
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

    clicked(): void {
        this.editMode = true;
        this.onSelect.emit();
    }
}
