import {
    Component,
    Inject,
    OnInit
} from '@angular/core';

import {
    Validators,
    FormBuilder,
    FormGroup,
    FormControl
} from '@angular/forms';

import {
    Router
} from '@angular/router';

import {
    AccountService
} from '../services/account-service';

import {IAccount, Account} from '../../../common-types/account';

@Component({
    selector: 'account-cmp',
    templateUrl: 'account/templates/account-list.html',
    styleUrls: ['account/styles/account.css']
})
export class AccountListCmp implements OnInit {
    title: string = "Accounts";
    accounts: IAccount[] = [];
    accountForm: Account;

    constructor(
        private _accountService: AccountService,
        private router: Router
    ) {
        this.accountForm = new Account();
    }

    ngOnInit() {
        this._getAll();
    }

    private _getAll(): void {
        this._accountService
            .getAll()
            .subscribe((accounts) => {
                console.log('got all', accounts);
                this.accounts = accounts;
            });
    }

    add(account: IAccount): void {
        this._accountService
            .add(account)
            .subscribe((m) => {
                this.accounts.push(m);
                this.accountForm = new Account();
            });
    }

    remove(id: string): void {
        this._accountService
            .remove(id)
            .subscribe(() => {
                this.accounts.forEach((t, i) => {
                    if (t._id === id)
                        return this.accounts.splice(i, 1);
                });
            })
    }

    onSelect(account: IAccount) {
        this.router.navigate(['/account', account._id]);
    }
}
