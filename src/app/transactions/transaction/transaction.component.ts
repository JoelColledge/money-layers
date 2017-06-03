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
    StructureCacheService
} from '../../shared/structure-cache.service';

import {Account, Structure, findAccountIdByName, findAccountById} from '../../../../common-types/account';
import {Transaction, Entry, calendarDate} from '../../../../common-types/transaction';
import {EntryPattern, TransactionPattern} from '../patterns/transaction-pattern';

@Component({
  selector: 'transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
    @Input() transaction: Transaction = new Transaction();
    @Input() pattern: TransactionPattern;
    @Output() onSelect = new EventEmitter<number>();
    @Output() onUpdate = new EventEmitter<{index: number, transaction: Transaction, deselect: boolean}>();
    @Output() onDelete = new EventEmitter<number>();
    @Output() onDuplicate = new EventEmitter<Transaction>();

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
    valid: boolean = true;

    private _transactionDate: Date;

    constructor(
        private structureCacheService: StructureCacheService,
        private router: Router
    ) { }

    ngOnInit() {
        this.transactionChanged();
    }

    update(deselect: boolean): void {
        this.onUpdate.emit({index: this._index, transaction: this.transaction, deselect: deselect});
    }

    delete(): void {
        this.onDelete.emit(this._index);
    }

    clicked(event: any): void {
        if (!event.target.classList.contains('btn-cancel')) {
            this.onSelect.emit(this._index);
        }
    }

    duplicate(): void {
        this.onDuplicate.emit(this.transaction);
    }

    cancel(): void {
        this.onSelect.emit(-1);
    }

    addEntry(): void {
        this.transaction.entries.push({account: undefined, change: 0});
    }

    deleteEntry(index: number): void {
        this.transaction.entries.splice(index, 1);
        this.transactionChanged();
    }

    transactionChanged(): void {
        this.valid = this.structureCacheService.get().rules
            .every((rule) => this.sumByGroup(rule.groupLeft) === this.sumByGroup(rule.groupRight));
    }

    entryChanged(index: number): void {
        this.transaction = this.pattern.update(this.structureCacheService.get(), this.transaction);
        this.transactionChanged();
    }

    getEntryPattern(index: number): EntryPattern {
        return this.pattern.entryPatterns[index] || new EntryPattern();
    }

    transactionQuantities(): number[] {
        return Array.from(new Set(
                this.transaction.entries
                    .map((entry) => Math.abs(entry.change))
            )).map((change) => change / 100);
    }

    transactionType(): string {
        let worldAccountId = findAccountIdByName(this.structureCacheService.get(), 'a-World');
        if (!worldAccountId) {
            return 'none';
        }

        let worldEntry = this.transaction.entries.find((entry) => entry.account === worldAccountId);
        if (!worldEntry) {
            return 'none';
        }

        return worldEntry.change > 0 ? 'expense' :
            (worldEntry.change < 0 ? 'income' : 'none');
    }

    icons(): string[] {
        return this.transaction.entries
            .map((entry) => findAccountById(this.structureCacheService.get(), entry.account))
            .filter((account) => !!account)
            .map((account) => account.icon)
            .filter((icon) => !!icon);
    }

    transactionDate(): Date {
        return this._transactionDate;
    }

    transactionDateChanged(date: Date): void {
        this._transactionDate = date;
        this.transaction.date = calendarDate(date);
    }

    private sumByGroup(group: string): number {
        return this.entriesInGroup(group)
            .reduce((s, entry) => s + entry.change, 0);
    }

    private entriesInGroup(group: string): Entry[] {
        return this.transaction.entries
            .filter((entry) => {
                let account = this.accountById(entry.account);
                return !!account && account.groups.indexOf(group) > -1;
            });
    }

    private accountById(accountId: string): Account {
        return this.structureCacheService.get().accounts.find((account) => account._id === accountId);
    }

    private updateEditMode(): void {
        let wasEditMode = this.editMode;
        this.editMode = this._selectedIndex === this._index;
    }

}
