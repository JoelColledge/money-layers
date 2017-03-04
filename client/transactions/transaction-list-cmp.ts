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

@Component({
    selector: 'transaction-list',
    templateUrl: 'transactions/transaction-list.html',
    styleUrls: ['styles/account.css']
})
export class TransactionListCmp implements OnInit {
    structure: Structure = new Structure();
    month: Date = new Date();
    transactions: Transaction[] = [];
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
                this.transactions = transactions;
            });
    }

    monthChanged(event): void {
        this.month = new Date(event.target.value);
        this._getAll();
    }

    add(): void {
        this.selectedIndex = 0;
        this.transactions.unshift(new Transaction());
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
        this.transactionService
            .delete(this.transactions[index]._id)
            .subscribe(() => {
                this.selectedIndex = -1;
                this.transactions.splice(index, 1);
            });
    }
}
