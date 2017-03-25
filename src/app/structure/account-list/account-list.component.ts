import {
    Component,
    OnInit
} from '@angular/core';

import {
    AccountService
} from '../../shared/account.service';

import {Account} from '../../../../common-types/account';

@Component({
  selector: 'account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
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
