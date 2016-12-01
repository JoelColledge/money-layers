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
    @Output() onSelect = new EventEmitter<number>();
    @Output() onUpdate = new EventEmitter<{index: number, transaction: Transaction, deselect: boolean}>();
    @Output() onDelete = new EventEmitter<number>();

    @Input()
    set selectedIndex(index: number) {
        let wasEditMode = this.editMode;
        this.editMode = index === this.index;

        if (wasEditMode && !this.editMode) {
            this.update(false);
        }
    }

    editMode: boolean = false;

    constructor(
        private transactionService: TransactionService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    update(deselect: boolean): void {
        this.onUpdate.emit({index: this.index, transaction: this.transaction, deselect: deselect});
    }

    delete(): void {
        this.onDelete.emit(this.index);
    }

    clicked(): void {
        this.onSelect.emit(this.index);
    }
}
