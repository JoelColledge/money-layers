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
import {Structure, Account} from '../../../../common-types/structure';

@Component({
  selector: 'account-totals',
  templateUrl: './account-totals.component.html',
  styleUrls: ['./account-totals.component.css']
})
export class AccountTotalsComponent implements OnInit {
    accountsByTypes: {typeDisplayString: string, accounts: Account[]}[] = [];
    accountTotals: AccountTotal[] = [];

    constructor(
        private structureCacheService: StructureCacheService,
        private _statisticsService: StatisticsService
    ) { }

    ngOnInit() {
        this._getAll();
    }

    private _getAll(): void {
        let structure = this.structureCacheService.get();
        this.accountsByTypes = structure.accountTotalTypes
            .map(typeName => ({
                typeDisplayString: this._findTypeDisplayString(structure, typeName),
                accounts: this._findAccountsByType(structure, typeName)
            }));
                structure.accounts.filter(account => structure.accountTotalTypes.includes(account.type));

        this._statisticsService
            .accountTotals()
            .subscribe((accountTotals) => {
                this.accountTotals = accountTotals;
            });
    }

    private _findTypeDisplayString(structure: Structure, typeName: string): string {
        let type = structure.types.find(type => type.name === typeName);
        return type ? type.display : typeName;
    }

    private _findAccountsByType(structure: Structure, typeName: string): Account[] {
        return structure.accounts.filter(account => account.type === typeName);
    }

    total(account: Account): number {
        let accountTotal = this.accountTotals.find((accountTotal) => accountTotal.account === account._id);
        return accountTotal ? accountTotal.total / 100 : 0;
    }
}
