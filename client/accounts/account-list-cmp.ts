import {
    Component,
    OnInit
} from '@angular/core';

import {
    AccountService
} from '../services/account-service';

import {Account} from '../../common-types/account';

@Component({
    selector: 'account-list',
    templateUrl: 'accounts/account-list.html'
})
export class AccountListCmp implements OnInit {
    accounts: Account[] = [];

    constructor(
        private _accountService: AccountService
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
    }

    add(): void {
        this.accounts.push(new Account());
    }
}
