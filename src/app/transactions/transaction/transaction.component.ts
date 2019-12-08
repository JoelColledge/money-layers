import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';

import {
    ActivatedRoute,
    Router
} from '@angular/router';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import {Account, Structure, Rule, findAccountIdByName, findAccountById, findAccountIdsByType} from '../../../../common-types/structure';
import {Transaction, Entry, calendarDate} from '../../../../common-types/transaction';
import {EntryPattern, TransactionPattern} from '../patterns/transaction-pattern';

interface RuleViolation {
    rule: Rule;
    left: number;
    right: number;
    difference: number;
}

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
    editMode = false;
    datepickerConfig: Partial<BsDatepickerConfig>;

    private _transactionDate: Date;

    private structure: Structure;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.datepickerConfig = Object.assign({}, {
            showWeekNumbers: false
        });

        this.route.data
            .subscribe((data: { structure: Structure }) => {
                this.structure = data.structure;
            });
        this._transactionDate = new Date(this.transaction.date);
    }

    update(deselect: boolean): void {
        this.onUpdate.emit({index: this._index, transaction: this.transaction, deselect});
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
    }

    ruleViolations(): RuleViolation[] {
        return this.structure.rules
            .map(rule => {
                const left = this.sumByTypes(rule.typesLeft) / 100;
                const right = this.sumByTypes(rule.typesRight) / 100;
                return {
                    rule,
                    left,
                    right,
                    difference: left - right
                };
            })
            .filter(ruleParts => ruleParts.left !== ruleParts.right);
    }

    entryChanged(index: number): void {
        this.transaction = this.pattern.update(this.structure, this.transaction);
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
        const accountIds = findAccountIdsByType(this.structure, 'actual')
            .concat(findAccountIdsByType(this.structure, 'gbp-actual'));

        const entries = this.transaction.entries.filter(entry => accountIds.includes(entry.account));

        const totalChange = entries.map(entry => entry.change).reduce((acc, change) => acc + change, 0);

        return totalChange < 0 ? 'expense' :
            (totalChange > 0 ? 'income' : 'none');
    }

    icons(): string[] {
        return this.transaction.entries
            .map((entry) => findAccountById(this.structure, entry.account))
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

    private sumByTypes(types: string[]): number {
        return this.entriesWithTypes(types)
            .reduce((s, entry) => s + entry.change, 0);
    }

    private entriesWithTypes(types: string[]): Entry[] {
        return this.transaction.entries
            .filter((entry) => {
                const account = findAccountById(this.structure, entry.account);
                return !!account && types.includes(account.type);
            });
    }

    private updateEditMode(): void {
        const wasEditMode = this.editMode;
        this.editMode = this._selectedIndex === this._index;
    }

}
