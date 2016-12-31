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

import {ITransaction, Transaction, IEntry, Entry} from '../../common-types/transaction';

@Component({
    selector: 'transaction',
    templateUrl: 'transactions/transaction.html',
    styleUrls: ['styles/account.css']
})
export class TransactionCmp implements OnInit {
    @Input() transaction: ITransaction = new Transaction();
    @Output() onSelect = new EventEmitter<number>();
    @Output() onUpdate = new EventEmitter<{index: number, transaction: Transaction, deselect: boolean}>();
    @Output() onDelete = new EventEmitter<number>();

    @Input()
    set index(index: number) {
        this._index = index;
        this.updateEditMode();
    }

    @Input()
    set selectedIndex(index: number) {
        this._selectedIndex = index;
        this.updateEditMode();
    }

    _index: number;
    _selectedIndex: number;
    editMode: boolean = false;

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
    }

    update(deselect: boolean): void {
        this.onUpdate.emit({index: this._index, transaction: this.transaction, deselect: deselect});
    }

    delete(): void {
        this.onDelete.emit(this._index);
    }

    clicked(): void {
        this.onSelect.emit(this._index);
    }

    addEntry(): void {
        this.transaction.entries.push({account: undefined, change: 0});
    }

    deleteEntry(index: number): void {
        this.transaction.entries.splice(index, 1);
    }

    private updateEditMode(): void {
        let wasEditMode = this.editMode;
        this.editMode = this._selectedIndex === this._index;

        if (wasEditMode && !this.editMode) {
            this.update(false);
        }
    }
}
