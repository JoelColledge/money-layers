import {
    Component,
    OnInit
} from '@angular/core';

import {
    AccountService
} from '../../shared/account.service';

import {
    StatisticsService
} from '../statistics.service';

import {AccountTotal} from '../../../../common-types/statistics';
import {Account} from '../../../../common-types/account';

@Component({
  selector: 'account-totals',
  templateUrl: './account-totals.component.html',
  styleUrls: ['./account-totals.component.css']
})
export class AccountTotalsComponent implements OnInit {
    accounts: Account[] = [];
    accountTotals: AccountTotal[] = [];

    constructor(
        private _accountService: AccountService,
        private _statisticsService: StatisticsService
    ) { }

    ngOnInit() {
        this._getAll();
    }

    private _getAll(): void {
        this._accountService
            .getAll()
            .subscribe((accounts) => {
                this.accounts = accounts;
            });

        this._statisticsService
            .accountTotals()
            .subscribe((accountTotals) => {
                this.accountTotals = accountTotals;
            });
    }

    total(account: Account): number {
        let accountTotal = this.accountTotals.find((accountTotal) => accountTotal.account === account._id);
        return accountTotal ? accountTotal.total / 100 : 0;
    }
}
