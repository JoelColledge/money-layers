import {
    Component,
    OnInit
} from '@angular/core';

import {
    Router
} from '@angular/router';

import {
    Observable
} from 'rxjs/Rx';

import {
    AccountService
} from '../services/account-service';

import {
    RuleService
} from '../services/rule-service';

import {
    TransactionService
} from '../services/transaction-service';

import {Structure} from '../../common-types/account';
import {Transaction, dateToMonth} from '../../common-types/transaction';
import {TransactionPattern} from '../patterns/transaction-pattern';
import {ExpensePattern} from '../patterns/expense-pattern';
import {GenericPattern} from '../patterns/generic-pattern';

@Component({
    selector: 'transaction-list',
    templateUrl: 'transactions/transaction-list.html'
})
export class TransactionListCmp implements OnInit {
    structure: Structure = new Structure();
    month: Date = new Date();
    transactions: Transaction[] = [];
    patterns: TransactionPattern[] = [];
    selectedIndex: number;

    constructor(
        private accountService: AccountService,
        private ruleService: RuleService,
        private transactionService: TransactionService,
        private router: Router
    ) { }

    ngOnInit() {
        this._getAll();
    }

    private _getAll(): void {
        let accountsObservable = this.accountService.getAll();
        let rulesObservable = this.ruleService.getAll();
        let transactionsObservable = this.transactionService.getAll(dateToMonth(this.month));
        Observable.forkJoin(accountsObservable, rulesObservable, transactionsObservable)
            .subscribe(([accounts, rules, transactions]) => {
                this.structure = new Structure(accounts, rules);
                this.patterns = [];
                this.transactions = transactions;
                this.selectedIndex = -1;
            });
    }

    monthChanged(event): void {
        this.month = new Date(event.target.value);
        this._getAll();
    }

    addExpense(): void {
        this.add(new ExpensePattern());
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
        this.selectedIndex = 0;
        this.patterns.unshift(pattern);
        this.transactions.unshift(pattern.create(this.structure));
    }
}
