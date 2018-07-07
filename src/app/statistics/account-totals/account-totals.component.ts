import {
    Component,
    OnInit
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

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

    private structure: Structure;

    constructor(
        private route: ActivatedRoute,
        private statisticsService: StatisticsService
    ) { }

    ngOnInit() {
        this.route.data
            .subscribe((data: { structure: Structure }) => {
                this.structure = data.structure;
                this.getAll();
            });
    }

    private getAll(): void {
        this.accountsByTypes = this.structure.accountTotalTypes
            .map(typeName => ({
                typeDisplayString: this.findTypeDisplayString(typeName),
                accounts: this.findAccountsByType(typeName)
            }));

        this.statisticsService
            .accountTotals()
            .subscribe((accountTotals) => {
                this.accountTotals = accountTotals;
            });
    }

    private findTypeDisplayString(typeName: string): string {
        let type = this.structure.types.find(type => type.name === typeName);
        return type ? type.display : typeName;
    }

    private findAccountsByType(typeName: string): Account[] {
        return this.structure.accounts.filter(account => account.type === typeName);
    }

    total(account: Account): number {
        let accountTotal = this.accountTotals.find((accountTotal) => accountTotal.account === account._id);
        return accountTotal ? accountTotal.total / 100 : 0;
    }
}
