import {
    Component,
    OnInit
} from '@angular/core';

import {
    StructureCacheService
} from '../../shared/structure-cache.service';

import {
    StatisticsService
} from '../statistics.service';

import {AccountTotal} from '../../../../common-types/statistics';
import {Account} from '../../../../common-types/structure';

@Component({
  selector: 'account-totals',
  templateUrl: './account-totals.component.html',
  styleUrls: ['./account-totals.component.css']
})
export class AccountTotalsComponent implements OnInit {
    accounts: Account[] = [];
    accountTotals: AccountTotal[] = [];

    constructor(
        private structureCacheService: StructureCacheService,
        private _statisticsService: StatisticsService
    ) { }

    ngOnInit() {
        this._getAll();
    }

    private _getAll(): void {
        this.accounts = this.structureCacheService.get().accounts.filter((account) => account.showInList);

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
