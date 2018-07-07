import {
    Component,
    OnInit
} from '@angular/core';

import {
    ActivatedRoute,
    Router
} from '@angular/router';

import {
    Observable
} from 'rxjs';

import {
    TransactionService
} from '../transaction.service';

import {Entry, Transaction, dateToMonth} from '../../../../common-types/transaction';
import {Structure} from '../../../../common-types/structure';

import {TransactionPattern} from '../patterns/transaction-pattern';
import {ExpensePattern} from '../patterns/expense-pattern';
import {IncomePattern} from '../patterns/income-pattern';
import {WithdrawalPattern} from '../patterns/withdrawal-pattern';
import {ExpenseGbpPattern} from '../patterns/expense-gbp-pattern';
import {GenericPattern} from '../patterns/generic-pattern';

@Component({
  selector: 'transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
    month: Date = new Date();
    transactions: Transaction[] = [];
    patterns: TransactionPattern[] = [];
    selectedIndex: number;

    private structure: Structure;

    constructor(
        private route: ActivatedRoute,
        private transactionService: TransactionService,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.data
            .subscribe((data: { structure: Structure }) => {
                this.structure = data.structure;
            });
    }

    private _getAll(): void {
        this.transactionService.getAll(dateToMonth(this.month))
            .subscribe(transactions => {
                this.patterns = [];
                this.transactions = transactions;
                this.selectedIndex = -1;
            });
    }

    monthChanged(date: Date): void {
        this.month = date;
        this._getAll();
    }

    addExpense(): void {
        this.add(new ExpensePattern());
    }

    addIncome(): void {
        this.add(new IncomePattern());
    }

    addWithdrawal(): void {
        this.add(new WithdrawalPattern());
    }

    addExpenseGbp(): void {
        this.add(new ExpenseGbpPattern());
    }

    addGeneric(): void {
        this.add(new GenericPattern());
    }

    update(event: {index: number, transaction: Transaction, deselect: boolean}): void {
        this.transactionService
            .addOrUpdate(event.transaction)
            .subscribe((m) => {
                this.transactions[event.index] = m;
                if (event.deselect) {
                    this.selectedIndex = -1;
                }
            });
    }

    duplicate(transaction: Transaction): void {
        this.addTransaction(null, new Transaction(
            undefined,
            transaction.description,
            transaction.notes,
            transaction.date,
            transaction.entries.map((entry) => new Entry(entry.account, entry.change))
        ));
    }

    transactionSelected(index: number) {
        this.selectedIndex = index;
    }

    delete(index: number): void {
        let transaction = this.transactions[index];
        if (transaction._id) {
            this.transactionService
                .delete(this.transactions[index]._id)
                .subscribe(() => this.removeTransaction(index));
        } else {
            this.removeTransaction(index);
        }
    }

    private removeTransaction(index: number) {
        this.selectedIndex = -1;
        this.patterns.splice(index, 1);
        this.transactions.splice(index, 1);
    }

    getPattern(index: number): TransactionPattern {
        return this.patterns[index] || new GenericPattern();
    }

    private add(pattern: TransactionPattern) {
        let transaction = pattern.create(this.structure);
        let now = new Date();
        if (this.month.getMonth() !== now.getMonth() || this.month.getFullYear() !== now.getFullYear()) {
            transaction.date = this.month.toISOString();
        }
        this.addTransaction(pattern, transaction);
    }

    private addTransaction(pattern: TransactionPattern, transaction: Transaction) {
        this.selectedIndex = 0;
        this.patterns.unshift(pattern);
        this.transactions.unshift(transaction);
    }

}
